import { createRouter, createWebHistory } from 'vue-router'
import FormDesign from '@/views/FormDesign/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'formDesign',
      component: FormDesign
    }
  ]
})

export default router
