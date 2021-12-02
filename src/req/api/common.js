function install(req, request) {
  req.common = {
    queryList(data) {
      const url = `${req.apiUrl}/Common/Page`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
    all(data) {
      const url = `${req.apiUrl}/Common/All`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
    find(data) {
      const url = `${req.apiUrl}/Common/Find`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
    get(data) {
      const url = `${req.apiUrl}/Common/Get`;
      return request({
        url,
        method: 'GET',
        data,
      });
    },
    create(data) {
      const url = `${req.apiUrl}/Common/Create`;
      return request({
        url,
        method: 'POST',
        data,
      });
    },
    change(data) {
      const url = `${req.apiUrl}/Common/Update`;
      return request({
        url,
        method: 'POST',
        data,
      });
    },
    remove(data) {
      const url = `${req.apiUrl}/Common/Delete`;
      return request({
        url,
        method: 'DELETE',
        data,
      });
    },
  };
}

module.exports = {
  install,
};
