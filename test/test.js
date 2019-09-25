
const api = new axiosp({
  baseURL: 'https://taohuayuanskill.com',
  timeout: 30000,
  validateStatus: function (status) {
    return status < 500
  },
  forbidRepeat: true, // 不允许重复请求
  pathignore: [], // 需要过滤的请求
  repeatCallback: (config) => {
    alert('别点啦，一会再试')
  }
})

api.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error.response)
})

let button = document.querySelector('#button')
button.addEventListener('click', function() {
  api.get('/api/article/recommendList', {
    article_id: 10024,
    classify_id: 10005,
    first_id: 10001
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
})
