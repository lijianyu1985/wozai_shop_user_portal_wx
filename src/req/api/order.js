function install(req, request) {
  req.order = {
    create(data) {
      const url = `${req.apiUrl}/Wx/Order/Create`;
      return request({
        url,
        method: 'POST',
        data,
      });
    },
    updateAddressAndDes(data) {
      const url = `${req.apiUrl}/Wx/Order/UpdateAddressAndDes`;
      return request({
        url,
        method: 'POST',
        data,
      });
    },
    get(id) {
      const url = `${req.apiUrl}/Wx/Order/Get`;
      return request({
        url,
        method: 'GET',
        data: { id },
      });
    },
    calculateShippingFee(data) {
      const url = `${req.apiUrl}/Wx/Order/CalculateShippingFee`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
    page(data) {
      const url = `${req.apiUrl}/Wx/Order/Page`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
  };
}

module.exports = {
  install,
};
