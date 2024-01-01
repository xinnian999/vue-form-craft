import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FormDesign from '@/views/FormDesign/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/formDesign',
      name: 'formDesign',
      component: FormDesign
    }
  ]
})

export default router
