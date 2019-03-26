import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/home/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index')
    },
    {
      path: '/job',
      name: 'job',
      component: () => import('../views/home/components/JobCards')
    }
  ]
})
