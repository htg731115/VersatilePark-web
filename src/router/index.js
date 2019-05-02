import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Main from '@/pages/Main'
import Main2 from '@/pages/Main_Manager'
import Register from '@/pages/User/Register'
import Menu from '@/components/Menu'
import Manager from '@/pages/Manager'
import Project from '@/pages/Project'
import Detail from '@/pages/M_deltal'
import Customer from '@/pages/Customer'
import Evaluation from '@/pages/Evaluation'
import PayCombo from '@/pages/PayCombo'
import ParkingRecord from '@/pages/ParkingRecord'
import PortRecord from '@/pages/PortRecord'
import CarFlow from '@/pages/CarFlow'
import Person from '@/pages/Manager/Person'
import ChangePassword from '@/pages/Manager/ChangePassword'
import ManagerProject from '@/pages/Manager/Project'
import ManagerParkingRecord from '@/pages/Manager/ParkingRecord'
import ManagerPortRecord from '@/pages/Manager/PortRecord'
import ManagerEvaluation from '@/pages/Manager/Evaluation'
import ManagerPayCombo from '@/pages/Manager/PayCombo'
import UserLogin from '@/pages/User/Login'
import UserMain from '@/pages/User/Main'
import userBuyCombo from '@/pages/User/userBuyCombo'
import certification from '@/pages/User/certification'
import UserEvaluation from '@/pages/User/Evaluation'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Index
    },
    {
      path: '/user/Login',
      name:'userLogin',
      component:UserLogin
    },
    {
      path:'/user/Register',
      name:'Register',
      component:Register
    },
    {
      path:"/user/Main",
      name:'UserMain',
      component:UserMain
    },
    {
      path:"/user/evaluation",
      name:'UserEvaluation',
      component:UserEvaluation
    },
    {
      path:"/user/buyCombo",
      name:'userBuyCombo',
      component:userBuyCombo
    },
    {
      path:"/user/certification",
      name:'certification',
      component:certification
    },
    {
      path:'/Main',
      name:'Main',
      component: Main,
      children:[
        {path:'/Main/project',name:'Project',component:Project},
        {path:'/Main/manager',name:'Manager',component:Manager},
        {path:'/Main/manager/detail/:id',name:'Detail',component:Detail},
        {path:'/Main/customer',name:'Customer',component:Customer},
        {path:'/Main/evaluation',name:'Evaluation',component:Evaluation},
        {path:'/Main/paycombo',name:'PayCombo',component:PayCombo},
        {path:'/Main/parkingrecord',name:'ParkingRecord',component:ParkingRecord},
        {path:'/Main/portrecord',name:'PortRecord',component:PortRecord},
        {path:'/Main/carflow',name:'CarFlow',component:CarFlow}],
      meta:{
         requiresAuth: true
      }
    },
    {
      path:'/Manager',
      name:'Manager',
      component: Main2,
      children:[
        {path:'/Manager/person',name:'person',component:Person},
        {path:'/Manager/changepassword',name:'changepassword',component:ChangePassword},
        {path:'/Manager/project',name:'managerProject',component:ManagerProject},
        {path:'/Manager/parkingrecord',name:'managerParkingRecord',component:ManagerParkingRecord},
        {path:'/Manager/portrecord',name:'managerPortRecord',component:ManagerPortRecord},
        {path:'/Manager/evaluation',name:'managerEvaluation',component:ManagerEvaluation},
        {path:'/Manager/paycombo',name:'managerPayCombo',component:ManagerPayCombo},
      ],
      meta:{
         requiresAuth: true
      }
    },
    {
      path:'/test',
      name:'test',
      component:Menu
    }
  ]
})
