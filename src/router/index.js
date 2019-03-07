import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Main from '@/pages/Main'
import Register from '@/pages/Register'
import Menu from '@/components/Menu'
import Manager from '@/pages/Manager'
import Project from '@/pages/Project'
import Detail from '@/pages/M_deltal'
import Customer from '@/pages/Customer'
import Evaluation from '@/pages/Evaluation'
import PayCombo from '@/pages/PayCombo'
import ParkingRecord from '@/pages/ParkingRecord'
import PortRecord from '@/pages/PortRecord'
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
      path:'/Register',
      name:'Register',
      component:Register
    },
    {
      path:'/Main',
      name:'Main',
      component: Main,
      children:[
        {path:'/project',name:'Project',component:Project},
        {path:'/manager',name:'Manager',component:Manager},
        {path:'/manager/detail/:id',name:'Detail',component:Detail},
        {path:'/customer',name:'Customer',component:Customer},
        {path:'/evaluation',name:'Evaluation',component:Evaluation},
        {path:'/paycombo',name:'PayCombo',component:PayCombo},
        {path:'/parkingrecord',name:'ParkingRecord',component:ParkingRecord},
        {path:'/portrecord',name:'PortRecord',component:PortRecord}],
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
