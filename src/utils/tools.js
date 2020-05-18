import config from '../utils/config'

const apiUrl = config.apiUrl

export const buildPictureUrl = url => {
  let pictureUrl = encodeURI(url)
  if (pictureUrl.indexOf('http://') !== 0 && pictureUrl.indexOf('https://') !== 0) {
    pictureUrl = `${trimEnd(apiUrl, '/')}/${trimStart(pictureUrl, '/')}`
  }
  return pictureUrl
}

export const trimEnd = (val, target) => {
  if (!val) { return val }
  if (val.lastIndexOf(target) !== (val.length - target.length)) {
    return val
  }
  return val.substring(0, val.length - target.length)
}

export const trimStart = (val, target) => {
  if (!val) { return val }
  if (!val.startsWith(target)) {
    return val
  }
  return val.substring(target.length)
}
