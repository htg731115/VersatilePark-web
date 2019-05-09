// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import animate from 'animate.css'
import axios from 'axios'
import Vant from 'vant'
import md5 from 'js-md5'
import store from './store/store.js'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css';
import qs from 'qs';


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vant);
Vue.prototype.$echarts =echarts
Vue.prototype.$axios = axios
Vue.prototype.$md5=md5
Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs;
axios.defaults.baseURL = 'http://localhost:8080/'; //配置接口地址

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){//管理员拦截
    if(store.state.userType==0){
      
      next();
    }
    else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth2)){//项目管理员拦截
    if(store.state.userType==1){
      next();
    }
    else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth3)){//客户拦截
    console.log(store.state);
    if(store.state.userType==2){
      next();
    }
    else{
      next({
        path: '/user/login',
        query: {redirect: to.fullPath}
      })
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
  template: '<App/>',
})
