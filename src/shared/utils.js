/**
 * 获取axios的请求参数
 */
export function getAxiosParmas (config) {
  let params = ''
  if (config.data) {
    if (typeof config.data === 'object') {
      return JSON.stringify(config.data)
    } else {
      return config.data
    }
  }
  if (config.params) {
    if (typeof config.params === 'object') {
      return JSON.stringify(config.params)
    } else {
      return config.params
    }
  }
  return params
}

/**
 * 路径合并
 */
export function pathMerge (baseUrl, mergeUrl) {
  if (baseUrl.charAt(baseUrl.length - 1) !== '/') {
    baseUrl = baseUrl + '/'
  }
  if (mergeUrl.charAt(0) === '/') {
    mergeUrl = mergeUrl.substr(1, mergeUrl.length -1)
  }
  return baseUrl + mergeUrl
}
