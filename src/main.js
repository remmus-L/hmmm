import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import * as filters from './filters' // global filters
// font-awesome
import 'font-awesome/css/font-awesome.css'

import axios from 'axios'
/*
 * 注册 - 业务模块
 */
import dashboard from '@/module-dashboard/' // 面板
import hmmm from '@/module-hmmm/'
import Cookies from 'js-cookie'
axios.defaults.baseURL = 'http://hmmm-api.itheima.net'

const TokenKey = 'Admin-Token'
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${Cookies.get(TokenKey)}` // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
Vue.prototype.$http = axios // 黑马面面

Vue.use(dashboard, store)

Vue.use(hmmm, store)

/*
 * 注册 - 组件
 */

// 饿了么
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
