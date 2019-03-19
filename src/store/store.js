import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userName: "",
    userId:"",
    userType:"",
  },
  mutations: {
    setUserName (state,userName) {
      state.userName=userName;
    },
    loginOut (state) {
      state.userName="";
    },
    setLogin(state,userId,userType){
      state.userId = userId;
      state.userType = userType;
    }
  }
})

export default store