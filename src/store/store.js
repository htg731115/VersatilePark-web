import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userName: "",
    userId:"",
    userType:"",
    projectId:"",
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
    },
    setPorjectId(state,projectId){
      state.projectId = projectId;
    }
  }
})

export default store