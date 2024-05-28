import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'home'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'about'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = i18n.global.t(to.meta.title)
})

export default router
