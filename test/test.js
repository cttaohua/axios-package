
const api = new axiosp({
  baseURL: 'http://api-server.dev.mofaxiao.com',
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
  api.get('/lms/assigment/paper_pdf', {
    assignment_id: ''
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
})
