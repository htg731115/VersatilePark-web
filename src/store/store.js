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
    setLogin(state,userId,userType){
      state.userId = userId;
      sessionStorage.setItem("userId",userId);
      state.userType = userType;
      sessionStorage.setItem("userType",userType);
    },
    setPorjectId(state,projectId){
      state.projectId = projectId;
      sessionStorage.setItem("projectId",projectId);
    },
    setCustomerId(state,customerId){
      state.customerId = customerId;
      sessionStorage.setItem("customerId",customerId);
    }
  }
})

export default store