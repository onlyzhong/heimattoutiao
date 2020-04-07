import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
// 导入 vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 使用字体图标文件
import './style/index.css'

// 导入过滤器
import './filter/myfilter.js'

// 使用 vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
