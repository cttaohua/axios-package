# axios-package
在axios的基础上增加了防止重复请求的功能

## 使用注意
axios-package认为请求链接，请求方式，请求参数完全一致的请求为重复请求。在服务器返回上一个请求的结果前，如果程序要发起相同的请求，则该请求不会发出，直到直到服务器返回了上一个请求的结果，在后台管理类项目里非常实用

## 使用方法
```
import axiosp from 'axios-package'

const api = new axiosp({
  baseURL: 'https://xxxxxxxx',
  timeout: 30000,
  ....  // 和axios使用方式一样
  ....  // 以下是axios-package新增的属性
  forbidRepeat: true, // 是否允许重复请求，默认为true
  pathignore: [ // 需要过滤掉的请求，默认无
    ''
  ],
  repeatCallback: (config) => { // 当有重复请求时的回调函数，参数是axios封装的ajax对象
    alert('别点啦，一会再试！')
  }
})

api.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error.response)
})

//api.pending 当前浏览器发出但服务器还没返回的ajax的集合

//api.abortRequest() 执行此方法可将所有还没有返回结果的ajax中止，在页面切换的时候可以使用

export default api
```


其他的使用方式和axios完全一致
