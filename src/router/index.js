import Vue from 'vue'
import Router from 'vue-router'
// 导入 useVant
import UseVant from '../views/useVant'
// 导入 login
import Login from '../views/login'

Vue.use(Router)

export default new Router({
  routes: [
    // 添加路由：UseVant
    {
      path: '/usevant',
      component: UseVant
    },
    // 登录路由
    {
      path: '/login',
      component: Login
    }
  ]
})
