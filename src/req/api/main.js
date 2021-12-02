function install(req, request) {
    req.main = {
      getBanners() {
        const url = `${req.apiUrl}/Wx/Main/GetBanners`;
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