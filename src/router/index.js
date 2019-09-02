import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import RunDetail from '@/components/RunDetail'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/runDetail',
      name: 'RunDetail',
      component: RunDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
