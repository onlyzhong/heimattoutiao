// 封装 axios 对象
import axios from 'axios'
// 导入 store
import store from '../store/index.js'

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})

// 设置拦截器
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 判断 store 中是否存在 token，如果存在将 token 添加到请求头中，如果不存在，不用理会
    // 1.0 得到 token
    var token = store.state.userInfo.token
    // 2.0 判断 token 是否存在
    if (token) {
      // 添加到请求头中
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 将对象暴露出去
export default instance
