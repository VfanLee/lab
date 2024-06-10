import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
    },
    {
      path: '/:id',
      name: 'room',
      component: () => import('../views/room/index.vue'),
    },
  ],
})

export default router
