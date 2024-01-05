import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/document',
    name: '文档',
    component: () => import('@/views/Document/index.vue'),
    redirect: '/document/start',
    children: [
      {
        path: '/document/start',
        name: '快速开始',
        component: () => import('@/views/Document/Start.vue'),
        meta: {
          md: 'start.md'
        }
      },
      {
        path: '/document/schemaFormDoc',
        name: 'SchemaForm（表单渲染器）',
        component: () => import('@/views/Document/Start.vue'),
        meta: {
          md: 'schemaFormDoc.md'
        }
      }
    ]
  },
  {
    path: '/formDesign',
    name: '表单设计',
    component: () => import('@/views/FormDesign/index.vue')
  },
  {
    path: '/test',
    name: '测试',
    component: () => import('@/views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
