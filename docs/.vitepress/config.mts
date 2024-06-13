import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-form-craft",
  description: "基于vue3的一个开箱即用低代码表单方案",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/start/introduce' }
    ],

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '简介', link: '/start/introduce' },
          { text: '快速上手', link: '/start/use' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
