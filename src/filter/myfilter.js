// 用来管理当前项目中所有的过滤器
import Vue from 'vue'
// 使用 dayjs
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// 定义过滤器
Vue.filter('timeFilter', function (value) {
  return dayjs().from(dayjs(value))
})
