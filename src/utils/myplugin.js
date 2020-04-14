// 用来封装登录方法的插件
// 导入 router
import router from '../router/index.js'
// 导入 store
import store from '../store/index'
// 导入 Toast
import { Toast } from 'vant'
// 定义一个插件对象
var myplugin = {}
// 添加 install 方法
myplugin.install = function (Vue) {
  // Vue 的构造器
  // 给 Vue 添加一个全局方法
  Vue.prototype.$login = function () {
    // 得到用户的登录信息
    var token = store.state.userInfo.token
    // 判断用户信息
    if (!token) {
      // 跳转到登录页面
      router.push('/checkLogin')
      // 提示: toast
      Toast.fail('您还没有登录')
      // 返回一个未登录的标识
      return false
    } else {
      // 说明登录：正常执行后续的代码
      return true
    }
  }
}
// 将插件对象暴露出去
export default myplugin
