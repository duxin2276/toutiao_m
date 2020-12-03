import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 取出token的方法   定义在storage.js中
    user: getItem(TOKEN_KEY)
    // window.localStorage.getItem(TOKEN_KEY)
    //   ? JSON.parse.window.localStorage.getItem(TOKEN_KEY) : null
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // console.log(data)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
      // 存储token的方法   定义在storage.js中
      setItem(TOKEN_KEY, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
