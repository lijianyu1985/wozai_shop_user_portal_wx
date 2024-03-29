import Dialog from '../components/vant/dialog/dialog';
import req from '../req';

async function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        return resolve(true);
      },
      fail() {
        return resolve(false);
      },
    });
  });
}

// 检测登录状态，返回 true / false
async function checkHasLogined() {
  const token = wx.getStorageSync('token');
  if (!token) {
    return false;
  }
  const loggined = await checkSession();
  if (!loggined) {
    wx.removeStorageSync('token');
    req.refreshToken(null);
    return false;
  }
  const checkTokenRes = await req.auth.checkToken(token);
  if (!checkTokenRes.success) {
    wx.removeStorageSync('token');
    req.refreshToken(null);
    return false;
  }
  return true;
}

async function wxaCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        return resolve(res.code);
      },
      fail() {
        wx.showToast({
          title: '获取code失败',
          icon: 'none',
        });
        return resolve('获取code失败');
      },
    });
  });
}

async function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: (res) => {
        return resolve(res);
      },
      fail: (err) => {
        console.error(err);
        return resolve();
      },
    });
  });
}

async function login(page, userInfo) {
  const _this = this;

  wx.login({
    success: function (res) {
      //后太默认注册
      req.auth
        .login(res.code, userInfo.nickName, userInfo.avatarUrl)
        .then(function (resBackend) {
          if (resBackend.code == 10000) {
            // 去注册
            //_this.register(page)
            return;
          }
          if (resBackend.code != 0) {
            // 登录错误
            wx.showModal({
              title: '无法登录',
              content: resBackend.msg || '登录错误',
              showCancel: false,
              success() {
                wx.redirectTo({
                  url: '/pages/categories',
                });
              },
            });
            return;
          }
          wx.setStorageSync('token', resBackend.data.token);
          req.refreshToken(resBackend.data.token);
          wx.setStorageSync('uid', resBackend.data.uid);
          wx.setStorageSync('session_key', resBackend.data.session_key);
          wx.setStorageSync('openid', resBackend.data.openid);
          if (page) {
            page.$wx.onShow();
          }
        });
    },
  });
}

async function authorize() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        const code = res.code;
        let referrer = ''; // 推荐人
        let referrer_storge = wx.getStorageSync('referrer');
        if (referrer_storge) {
          referrer = referrer_storge;
        }
        // 下面开始调用注册接口
        req.auth
          .authorize({
            code: code,
            referrer: referrer,
          })
          .then(function (res) {
            if (res.code == 0) {
              wx.setStorageSync('token', res.data.token);
              req.refreshToken(res.data.token);
              wx.setStorageSync('uid', res.data.uid);
              resolve(res);
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              });
              reject(res.msg);
            }
          });
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

function loginOut() {
  wx.removeStorageSync('token');
  req.refreshToken(null);
  wx.removeStorageSync('uid');
}

async function checkAndAuthorize(scope) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting[scope]) {
          wx.authorize({
            scope: scope,
            success() {
              resolve(); // 无返回参数
            },
            fail(e) {
              console.error(e);
              // if (e.errMsg.indexof('auth deny') != -1) {
              //   wx.showToast({
              //     title: e.errMsg,
              //     icon: 'none'
              //   })
              // }
              wx.showModal({
                title: '无权操作',
                content: '需要获得您的授权',
                showCancel: false,
                confirmText: '立即授权',
                confirmColor: '#e64340',
                success(res) {
                  wx.openSetting();
                },
                fail(e) {
                  console.error(e);
                  reject(e);
                },
              });
            },
          });
        } else {
          resolve(); // 无返回参数
        }
      },
      fail(e) {
        console.error(e);
        reject(e);
      },
    });
  });
}

function openLoginDialog() {
  Dialog.confirm({
    selector: '#van-dialog-auth-login',
    message: '需要登陆后才能继续操作',
    confirmButtonText: '立即登陆',
    cancelButtonText: '暂不登陆',
    showCancelButton: false,
    confirmButtonOpenType: 'getUserInfo',
    lang: 'zh_CN',
  })
    .then(() => {
      // Dialog.close()
    })
    .catch(() => {
      // Dialog.close()
    });
}

module.exports = {
  checkHasLogined: checkHasLogined,
  wxaCode: wxaCode,
  getUserInfo: getUserInfo,
  login: login,
  loginOut: loginOut,
  checkAndAuthorize: checkAndAuthorize,
  openLoginDialog: openLoginDialog,
  authorize: authorize,
};
