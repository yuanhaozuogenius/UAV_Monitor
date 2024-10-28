import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, //登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/monitoring',
      children: [
        {
          path: '/monitoring',
          component: () => import('@/views/monitoring/MonitoringPage.vue')
        },
        {
          path: '/datashow',
          component: () => import('@/views/dataShow/DataShow.vue')
        },
        {
          path: '/implement',
          component: () => import('@/views/model/ModelImplement.vue')
        },
        {
          path: '/update',
          component: () => import('@/views/model/ModelUpdate.vue')
        }
      ]
    } //登录页
  ]
})

// 登录访问拦截
router.beforeEach((to) => {
  // 如果没有token,且访问的是非登录页，拦截到登录页 其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})
export default router
