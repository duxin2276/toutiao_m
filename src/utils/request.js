// 导入axios
import axios from 'axios'
import store from '@/store/index'
// 导入bigint
import bigInt from 'json-bigint'
const request = axios.create({
  // 设置请求基准地址
  // baseURL: 'http://ttapi.research.itcast.cn/',
  baseURL: 'http://toutiao-app.itheima.net/',
  // 自定义处理返回的数据
  transformResponse: [function (data) {
    try {
      // 对 data 进行任意转换处理
      return bigInt.parse(data)
    } catch (error) {
      return data
    }
  }]
})
// 设置请求拦截器
request.interceptors.request.use(config => {
// Do something before request is sent
  config.headers = {
    Authorization: store.state.user ? `Bearer ${store.state.user.token}` : null
  }
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})
// 导出实例
export default request
