// 封装 axios 对象
import axios from 'axios'
// 导入 store
import store from '../store/index.js'
// 导入 json-bigint
import JSONBigInt from 'json-bigint'
// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  transformResponse: [
    function (data) {
      try {
        return JSONBigInt.parse(data)
      } catch (error) {
        return data
      }
    }
  ]
})

// 再创建一个 axios 实例，来更新 token
const instanceUpdateToken = axios.create({
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
  async function (error) {
    var status = error.response.status
    // 判断状态: token 过期
    if (status === 401) {
      // token过期,将refresh_token发送到服务器,获取新token
      // 获取refresh_token
      var refreshtoken = store.state.userInfo.refresh_token
      // 将refreshtoken提交到服务器得到新的 token
      // 借助 axios 发送请求
      var res = await instanceUpdateToken({
        url: '/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${refreshtoken}`
        }
      })
      // 获取更新后的token
      var newToken = res.data.data.token
      // 覆盖旧token
      store.commit('setUserInfo', {
        token: newToken,
        refresh_token: refreshtoken
      })
      // 重新发送未完成的请求,并且将接收到的结果返回
      return instance(error.config)
    }
    return Promise.reject(error)
  }
)

// 将对象暴露出去
export default instance
