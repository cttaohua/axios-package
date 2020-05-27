import axios from 'axios'
import { getAxiosParmas, pathMerge } from '../shared/utils'
const cancelToken = axios.CancelToken

class axiosp {
  constructor (params) {
    // 自定义属性
    this.definedAttr = ['forbidRepeat', 'pathignore', 'repeatCallback']
    if (params.forbidRepeat === false) { // 默认开启
      this.forbidRepeat = false
    } else {
      this.forbidRepeat = true
    }
    this.pathignore = params.pathignore || [] // 默认无
    this.repeatCallback = params.repeatCallback || null
    // axios 实例
    this.apiExample = null
    // 声明用于存储每个ajax的数组
    this.pending = []
    // 暴露中止ajax方法
    this.abortRequest = this.abortAjax

    // 删掉自定义的属性
    Object.keys(params).forEach(curr => {
      if (this.definedAttr.includes(curr)) {
        delete params[curr]
      }
    })
    this.createAxios(params)
  }

  // 创建axios实例
  createAxios (params) {
    this.apiExample = axios.create(params)
    // 代理属性
    this.proxyAttr()
    this.requestInterceptors()
    this.responseInterceptors()
  }

  // 代理属性
  proxyAttr () {
    let _this = this
    Object.keys(this.apiExample).forEach(attr => {
      Object.defineProperty(_this, attr, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter () {
          return _this.apiExample[attr]
        }
      })
    })
  }

  // request 拦截器
  requestInterceptors () {
    this.interceptors.request.use(config => {
      if (this.forbidRepeat) { // 需要防止重复请求
        let flag = this.judgePending(config)
        if (flag) {
          if (flag !== 'passed') {
            config.cancelToken = new cancelToken((cancelTokenFun) => {
              let requestObj = {
                path: pathMerge(config.baseURL, config.url) + '&' + config.method + '&' + getAxiosParmas(config),
                fun: cancelTokenFun
              }
              this.pending.push(requestObj)
            })
          }
        } else {
          if (this.repeatCallback) this.repeatCallback(config) // 调用请求重复之后的回调函数
          return Promise.reject(new Error('repeat request'))
        }
      }
      return config
    })
  }

  // response 拦截器
  responseInterceptors () {
    this.interceptors.response.use(res => {
      if (this.forbidRepeat) this.removePending(res.config)
      return res
    }, err => {
      if (this.forbidRepeat && err.config) this.removePending(err.config)
      return err
    })
  }

  /* 判断此条请求是否在数组中 */
  judgePending (config) {
    let requestUrl = pathMerge(config.baseURL, config.url) + '&' + config.method + '&' + getAxiosParmas(config)
    if (this.pathignore.length) { // 有需要过滤的请求
      let flag = false
      flag = this.pathignore.some(curr => {
        return requestUrl.includes(curr)
      })
      if (flag) { // 当前请求为需要过滤的请求
        return 'passed'
      }
    }
    for (const p in this.pending) {
      if (this.pending[p].path === requestUrl) { /* 当前请求在数组中存在时 */
        return false /* 重复的请求 */
      }
    }
    return 'norepeat' /* 未重复的请求 */
  }

  /* 移除已经发送过的请求 */
  removePending (config) {
    let requestUrl = pathMerge(config.baseURL, config.url) + '&' + config.method + '&' + getAxiosParmas(config)
    for (const p in this.pending) {
      if (this.pending[p].path === requestUrl) { /* 当前请求在数组中存在时 */
        this.pending.splice(p, 1) /* 把这条记录从数组中移除 */
        break /* 跳出for循环 */
      }
    }
  }

  /* 中止所有的ajax请求 */
  abortAjax () {
    this.pending.forEach(curr => {
      curr.fun()
    })
    this.pending = []
  }

}

export default axiosp
