function install(req, request) {
  req.commodity = {
    getDetails(data) {
      const url = `${req.apiUrl}/Wx/Commodity/Details`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
    getCategories(data) {
      const url = `${req.apiUrl}/Wx/Commodity/CategoriesAndFirstCategoryCommodities`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
    getCommoditiesByCategory(data) {
      const url = `${req.apiUrl}/Wx/Commodity/CommoditiesByCategory`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
    search(data) {
      const url = `${req.apiUrl}/Wx/Commodity/Search`;
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
