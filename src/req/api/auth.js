function install(req, request) {
  req.auth = {
    checkToken(token) {
      const url = `${req.apiUrl}/Client/wxCheckToken`;
      return request({
        url,
        method: 'POST',
        data: {
          token,
        },
      });
    },
    registerComplex(data) {
      const url = `${req.apiUrl}/Client/wxRegisterComplex`;
      return request({
        url,
        method: 'POST',
        data,
      });
    },
    login(code, nickName, avatarUrl) {
      const url = `${req.apiUrl}/Client/wxLogin`;
      return request({
        url,
        method: 'POST',
        data: {
          code,
          nickName,
          avatarUrl,
        },
      });
    },
  };
}

module.exports = {
  install,
};
