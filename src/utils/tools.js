import config from '../utils/config';

const apiUrl = config.apiUrl;

export const buildPictureUrl = (url) => {
  let pictureUrl = encodeURI(url);
  if (
    pictureUrl.indexOf('http://') !== 0 &&
    pictureUrl.indexOf('https://') !== 0
  ) {
    pictureUrl = `${trimEnd(apiUrl, '/')}/${trimStart(pictureUrl, '/')}`;
  }
  return pictureUrl;
};

export const trimEnd = (val, target) => {
  if (!val) {
    return val;
  }
  if (val.lastIndexOf(target) !== val.length - target.length) {
    return val;
  }
  return val.substring(0, val.length - target.length);
};

export const trimStart = (val, target) => {
  if (!val) {
    return val;
  }
  if (!val.startsWith(target)) {
    return val;
  }
  return val.substring(target.length);
};

export const indexOfArray = (arr, filter) => {
  for (var i = 0; i < arr.length; i++) {
    if (filter(arr[i])) return i;
  }
  return -1;
};

export const removeFromArray = (arr, filter) => {
  for (var i = 0; i < arr.length; i++) {
    if (filter(arr[i])) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

export const toDisplayTimestamp = (timestamp) => {
  if (!timestamp) {
    return '';
  }
  const timestapDate = new Date(timestamp);
  if (isNaN(timestapDate.getTime())) {
    return '';
  }
  return `${timestapDate.getFullYear()}-${
    timestapDate.getMonth() + 1
  }-${timestapDate.getDate()} ${timestapDate.getHours()}:${timestapDate.getMinutes()}:${timestapDate.getSeconds()}`;
};

export const toDisplayDate = (timestamp) => {
  if (!timestamp) {
    return '';
  }
  const timestapDate = new Date(timestamp);
  if (isNaN(timestapDate.getTime())) {
    return '';
  }
  return `${timestapDate.getFullYear()}-${
    timestapDate.getMonth() + 1
  }-${timestapDate.getDate()}`;
};
