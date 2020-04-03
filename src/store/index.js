import Vue from 'vue'
import Vuex from 'vuex'

// 导入操作token的方法
import { setLocal, getLocal } from '../utils/mytoken'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 用来保用户信息
    userInfo: getLocal('userInfo') || {}
  },
  mutations: {
    setUserInfo: function (state, payload) {
      state.userInfo = payload
      setLocal('userInfo', payload)
    }
  },
  actions: {

  }
})
