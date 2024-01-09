import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/homeMain.vue'),
      children: [
        {
          path: '/salaryList',
          name: 'salaryList',
          component: () => import('../views/salary/salaryList.page.vue')
        },
        {
          path: '/staffList',
          name: 'staffList',
          component: () => import('../views/staff/staffList.page.vue')
        },
        {
          path: '/projectList',
          name: 'projectList',
          component: () => import('../views/project/projectList.page.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    }
  ]
})

export default router
