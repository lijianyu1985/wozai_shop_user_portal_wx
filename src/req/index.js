const req = require('../utils/mp-req/index.js');
// api
const mainApi = require('./api/main.js');
const authApi = require('./api/auth.js');
const commodityApi = require('./api/commodity.js');
const commonApi = require('./api/common.js');
const profileApi = require('./api/profile.js');
import config from '../utils/config';

const apiUrl = config.apiUrl;

/**
 * code换取sessionId
 * @param {string} code
 */
function code2sessionId(code) {
  return new Promise((res, rej) => {
    wx.request({
      url: `${apiUrl}/Client/wxSignin`,
      method: 'POST',
      data: {
        code,
      },
      success(r1) {
        if (r1.data && r1.data.success) {
          res(r1.data.sessionId);
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

req.init({
  apiUrl,
  code2sessionId,
  isSessionAvailable,
});

req.use(mainApi);
req.use(commodityApi);
req.use(authApi);
req.use(commonApi);
req.use(profileApi);

module.exports = req;
