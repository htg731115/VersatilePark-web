import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userName: sessionStorage.getItem("userName"),
    userId: sessionStorage.getItem('userId'),
    userType:sessionStorage.getItem("userType"),
    projectId:sessionStorage.getItem("projectId"),

    server:'http://localhost:8090/'
  },
  mutations: {
    setUserName (state,userName) {
      state.userName = userName;
      sessionStorage.setItem("userName",userName)
    },
    loginOut () {
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userType");
      sessionStorage.removeItem("projectId");
      console.log(sessionStorage);
    },
    loginOut2(){
      sessionStorage.removeItem("customerId");
    },
    setLogin(state,obj){
      state.userId = obj.id;
      sessionStorage.setItem("userId",obj.id);
      state.userType = obj.userType;
      sessionStorage.setItem("userType",obj.userType);
      debugger;
    },
    setPorjectId(state,projectId){
      state.projectId = projectId;
      sessionStorage.setItem("projectId",projectId);
    },
  }
})

export default store