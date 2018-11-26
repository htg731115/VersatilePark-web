import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isLogin:window.sessionStorage.getItem('isLogin'),
    Username:window.sessionStorage.getItem('Username')
  },
  mutations:{
    In_Login:state => {
      state.isLogin=true;
      window.sessionStorage.setItem('isLogin',true);},
    Out_Login:state => {
      state.isLogin=false;
      window.sessionStorage.setItem('isLogin',false);},
    Set_Username:(state,date)=>{
      state.Username=date;
      window.sessionStorage.setItem('Username',date);
    }
  }
})
