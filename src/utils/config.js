const apiUrlTable = {
  local: 'http://192.168.43.60:12000',
  dev: 'http://localhost:12000',
  pre: 'http://192.168.12.89:12000',
  release: 'http://localhost:12000'
}
const apiUrl = apiUrlTable.local;

export default {
  apiUrl
};