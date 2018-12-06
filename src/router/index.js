import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Main from '@/pages/Main'
import Register from '@/pages/Register'
import Menu from '@/components/Menu'

import Project from '@/pages/Project'
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
      children:[{path:'/home',name:'Login',component:Index},{path:'/project',name:'project',component:Project}],
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
