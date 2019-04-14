import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/home/Index'
import CheckCompany from '../views/admin/components/CheckCompany'
import CheckJob from '../views/admin/components/CheckJob'
import UserList from '../views/admin/components/UserList'
Vue.use(Router)

const router = new Router({
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
      path: '/company/:companyId/job/:jobId',
      name: 'job',
      component: () => import('../views/job')
    },
    {
      path: '/company/:companyId',
      name: 'company',
      component: () => import('../views/company')
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../views/jobs')
    },
    {
      path: '/stu/:userId',
      name: 'stu',
      component: () => import('../views/resume/Index')
    },
    {
      path: '/hr/:userId',
      name: 'hr',
      component: () => import('../views/hr')
    },
    {
      path: '/hr/:userId/jobs',
      name: 'addJob',
      component: () => import('../views/hr/AddJob')
    },
    {
      path: '/hr/:userId/resumes',
      name: 'resumes',
      component: () => import('../views/hr/ManageResume')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin'),
      children: [
        {
          path: 'check-company',
          name: 'check-company',
          component: CheckCompany
        },
        {
          path: 'check-job',
          name: 'check-job',
          component: CheckJob
        },
        {
          path: 'user-list',
          name: 'user-list',
          component: UserList
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/components/Login')
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (getToken()) {
//     console.log('hello')
//     store.dispatch('getUserInfo').then(res => {
//       console.log(res.data)
//       console.log(store.getters.userId)
//     })
//   }
//   next()
// })
export default router
