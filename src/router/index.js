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
        path: '/document/introduce',
        name: '简介',
        component: () => import('@/views/Document/RenderMd.vue'),
        meta: {
          md: 'introduce.md'
        }
      },
      {
        path: '/document/start',
        name: '快速开始',
        component: () => import('@/views/Document/RenderMd.vue'),
        meta: {
          md: 'start.md'
        }
      },
      {
        path: '/document/FormDesignDoc',
        name: 'FormDesign（表单设计器）',
        component: () => import('@/views/Document/RenderMd.vue'),
        meta: {
          md: 'FormDesignDoc.md'
        }
      },
      {
        path: '/document/schemaFormDoc',
        name: 'SchemaForm（表单渲染器）',
        component: () => import('@/views/Document/RenderMd.vue'),
        meta: {
          md: 'schemaFormDoc.md'
        }
      },
      {
        path: '/document/globalConfig',
        name: '全局配置',
        component: () => import('@/views/Document/RenderMd.vue'),
        meta: {
          md: 'globalConfig.md'
        }
      },
      {
        path: '/document/schema',
        name: 'Schema详解',
        component: () => import('@/views/Document/RenderMd.vue'),
        meta: {
          md: 'schema.md'
        }
      },
      {
        path: '/document/linkage',
        name: '表单联动',
        component: () => import('@/views/Document/RenderMd.vue'),
        meta: {
          md: 'linkage.md'
        }
      },
      {
        path: '/document/lowCode',
        name: '低代码开发方案',
        component: () => import('@/views/Document/RenderMd.vue'),
        meta: {
          md: 'lowCode.md'
        }
      }
    ]
  },
  {
    path: '/formDesign',
    name: '表单设计',
    component: () => import('@/views/FormDesign.vue')
  }
  // {
  //   path: '/test',
  //   name: '测试',
  //   component: () => import('@/views/Test.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
