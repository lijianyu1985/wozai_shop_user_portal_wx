const req = require('../utils/mp-req/index.js');
// api
const mainApi = require('./api/main.js');
const authApi = require('./api/auth.js');
const commodityApi = require('./api/commodity.js');
const commonApi = require('./api/common.js');
const profileApi = require('./api/profile.js');
const orderApi = require('./api/order.js');
import config from '../utils/config';

const apiUrl = config.apiUrl;

/**
 * code换取sessionId
 * @param {string} code
 */
function code2sessionId(code) {
  return new Promise((res, rej) => {
    wx.request({
      url: `${apiUrl}/Client/wxLogin`,
      method: 'POST',
      data: {
        code,
      },
      success(r1) {
        if (r1.data && r1.data.success) {
          wx.setStorageSync('token', r1.data.data.token);
          req.refreshToken(r1.data.data.token);
          wx.setStorageSync('uid', r1.data.data.uid);
          wx.setStorageSync('session_key', r1.data.data.session_key);
          wx.setStorageSync('openid', r1.data.data.openid);
          res(r1.data.data.session_key);
        } else {
          rej(r1);
        }
      },
      fail: rej,
    });
  });
}

/**
 * 检查session是否有效
 * @param {any} res
 */
function isSessionAvailable(res) {
  return res.code !== 3000;
}

function errorHandler(response) {
  if (!response.success) {
    const msg =
      (response.error
        ? response.error.msg || response.error.message || response.error
        : response.msg) || response.errMsg;
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
    });
  }
}

req.init({
  apiUrl,
  code2sessionId,
  isSessionAvailable,
  errorHandler,
});

req.use(mainApi);
req.use(commodityApi);
req.use(authApi);
req.use(commonApi);
req.use(profileApi);
req.use(orderApi);

module.exports = req;
