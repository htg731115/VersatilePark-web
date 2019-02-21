// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import animate from 'animate.css'
import axios from 'axios'
import md5 from 'js-md5'
import store from './store/store.js'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs';


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts =echarts
Vue.prototype.$axios = axios
Vue.prototype.$md5=md5
Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs;
axios.defaults.baseURL = 'http://localhost:8090/'; //配置接口地址

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    if(store.state.isLogin)
      next()
    else{
      console.log("1");
      next()
    }
  }
  else{
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  axios,
  store,
  echarts,
  template: '<App/>'
})
