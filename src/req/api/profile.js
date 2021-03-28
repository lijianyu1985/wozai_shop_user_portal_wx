function install(req, request) {
  req.profile = {
    basic() {
      const url = `${req.apiUrl}/Client/wxBasic`;
      return request({
        url,
        method: 'POST',
      });
    },
    defaultAddress() {
      const url = `${req.apiUrl}/Client/defaultAddress`;
      return request({
        url,
        method: 'GET',
      });
    },
  };
}

module.exports = {
  install,
};
