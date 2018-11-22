// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import animate from 'animate.css'
import axios from 'axios'
import md5 from 'js-md5';
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.prototype.$md5=md5
axios.defaults.baseURL = 'http://localhost:8090/'; //配置接口地址

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  axios,
  template: '<App/>'
})
