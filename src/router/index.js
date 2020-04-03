import Vue from 'vue'
import Router from 'vue-router'
// 导入 useVant
import UseVant from '../views/useVant'
// 导入 login
import Login from '../views/login'
// 导入 index
import Index from '../views/index'
// 导入 layout
import Layout from '../views/layout'
// 导入 my
import My from '../views/my'

Vue.use(Router)

export default new Router({
  routes: [
    // 路由重定向
    {
      path: '*',
      redirect: 'index'
    },
    // 添加路由：UseVant
    {
      path: '/usevant',
      component: UseVant
    },
    // 登录路由
    {
      path: '/login',
      component: Login
    },
    // 设置 layout
    {
      path: '/layout',
      component: Layout,
      children: [
        // 首页路由
        {
          path: '/index', // 请求的路由： /index
          component: Index
        },
        // 我的路由
        {
          path: '/my',
          component: My
        }
      ]
    }
  ]
})
