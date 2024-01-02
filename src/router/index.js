import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FormDesign from '@/views/FormDesign/index.vue'
import Document from '@/views/Document/index.vue'

export const routes = [
  {
    path: '/',
    name: '首页',
    component: Home
  },
  {
    path: '/document',
    name: '文档',
    component: Document
  },
  {
    path: '/formDesign',
    name: '表单设计',
    component: FormDesign
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
