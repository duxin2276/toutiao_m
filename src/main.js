import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 用于设置 rem 基准值
import 'amfe-flexible'
// 导入全局样式
import '../src/style/index.css'
// 导入格式化时间的库
import '@/utils/dayjs'
// <----------------------------------------------------------------------->
// 注册vant组件库
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
