import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { mdVueDemoPlugin } from 'vitepress-vue-demo'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Form Craft',
  description: '基于vue3的一个开箱即用低代码表单方案',
  base: '/vue-form-craft/',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src/', import.meta.url)),
        'vue-form-craft': fileURLToPath(new URL('../../src/release', import.meta.url))
      }
    },
    server: {
      port: 9999
    },
    plugins: [viteCommonjs() as any]
  },
  vue: {
    script: {
      defineModel: true
    }
  },
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/doc/introduce' },
      { text: '表单设计', link: '/form-design' }
    ],

    sidebar: {
      '/doc/': [
        {
          text: '基础',
          items: [
            { text: '简介', link: '/doc/introduce' },
            { text: '快速开始', link: '/doc/use' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: 'JsonSchema详解', link: '/doc/schema' },
            { text: '表单联动', link: '/doc/linkage' },
            { text: '深层数据绑定', link: '/doc/deepName' }
          ]
        },
        {
          text: '组件',
          items: [
            { text: 'FormDesign 表单设计器', link: '/doc/form-design-doc' },
            { text: 'FormRender 表单渲染器', link: '/doc/form-render-doc' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  },
  markdown: {
    config: (md) => {
      md.use(mdVueDemoPlugin)
    }
  }
})
