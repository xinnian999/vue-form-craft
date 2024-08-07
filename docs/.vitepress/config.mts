import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Form Craft',
  description: '基于vue3的一个开箱即用低代码表单方案',
  base: '/vue-form-craft/',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src/', import.meta.url))
        // 'vue-form-craft': fileURLToPath(new URL('../../src/release', import.meta.url))
      }
    },
    server: {
      port: 9999
    },
    plugins: [viteCommonjs() as any]
  },
  head:[
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/start/introduce' },
      { text: '文档', link: '/doc/form-design-doc' },
      { text: '表单设计', link: '/form-design' }
    ],

    sidebar: {
      '/start/': [
        {
          text: '快速开始',
          items: [
            { text: '简介', link: '/start/introduce' },
            { text: '快速上手', link: '/start/use' }
          ]
        }
      ],
      '/doc/': [
        {
          text: '文档',
          items: [
            { text: 'FormDesign 表单设计器', link: '/doc/form-design-doc' },
            { text: 'SchemaForm 表单渲染器', link: '/doc/schema-form-doc' },
            { text: 'Schema详解', link: '/doc/schema' },
            { text: '表单联动', link: '/doc/linkage' },
            { text: '全局配置', link: '/doc/globalConfig' },
            { text: '低代码开发方案', link: '/doc/lowCode' },
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
