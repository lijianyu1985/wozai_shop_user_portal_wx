function install(req, request) {
  req.profile = {
    basic(uid) {
      const url = `${req.apiUrl}/Client/wxBasic`;
      return request({
        url,
        method: 'POST',
        data: {
          uid,
        },
      });
    },
  };
}

module.exports = {
  install,
};
