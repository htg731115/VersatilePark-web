import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isLogin:0,
    Username:sessionStorage.getItem('Username')
  },
  mutations:{
    increment:state => state.isLogin ++,
    decrement:state => state.isLogin --,
    setUsername:(state,date)=>{
      state.Username=date;
      sessionStorage.setItem('Username',date);
    }
  }
})
