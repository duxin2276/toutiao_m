// 导入格式化时间包
import dayjs from 'dayjs'
import Vue from 'vue'
// dayjs  默认语言是英文， 我们这里配置为中文
import 'dayjs/locale/zh-cn.js'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn') // 全局使用
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
Vue.filter('relativeTime', value => dayjs().to(dayjs(value)))
