import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { mdVueDemoPlugin } from 'vitepress-vue-demo'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh',
  title: 'Vue Form Craft',
  description: '基于vue3的一个开箱即用低代码表单方案',
  base: '/vue-form-craft/',
  vite: {
    // resolve: {
    //   alias: {
    //     '@vue-form-craft': fileURLToPath(new URL('../../src/', import.meta.url)),
    //     'vue-form-craft': fileURLToPath(new URL('../../src/release', import.meta.url))
    //   }
    // },
    server: {
      port: 9999,
      // host:'172.20.72.37'
      host: true
    },
    plugins: [viteCommonjs() as any]
  },
  head: [['link', { rel: 'icon', href: '/vue-form-craft/favicon.svg' }]],
  markdown: {
    config: (md) => {
      md.use(mdVueDemoPlugin,{root:'./'})
    }
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xinnian999/vue-form-craft' }]
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/favicon.svg',
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '文档', link: '/zh/introduce' },
          { text: '表单设计', link: '/zh/form-design' }
        ],

        sidebar: {
          '/zh/': [
            {
              text: '基础',
              items: [
                { text: '简介', link: '/zh/introduce' },
                { text: '快速开始', link: '/zh/use' }
              ]
            },
            {
              text: '进阶',
              items: [
                { text: 'JsonSchema详解', link: '/zh/schema' },
                { text: '表单联动', link: '/zh/linkage' },
                { text: '深层数据绑定', link: '/zh/deepName' },
                { text: '自定义组件', link: '/zh/custom-component' },
                { text: 'useFormInstance', link: '/zh/useFormInstance' }
              ]
            },
            {
              text: '组件',
              items: [
                { text: 'FormDesign 表单设计器', link: '/zh/form-design-doc' },
                { text: 'FormRender 表单渲染器', link: '/zh/form-render-doc' }
              ]
            },
            {
              text: '扩展',
              items: [
                { text: '扩展表单设计器', link: '/zh/extend' },
                { text: '例：扩展markdown输入框', link: '/zh/extendMd' },
                { text: '例：扩展穿梭框', link: '/zh/extendTransfer' },
                { text: '例：扩展其他组件库', link: '/zh/extendOther' }
              ]
            },
            {
              text: '更多',
              items: [
                { text: '类型声明', link: '/zh/interface' },
                { text: '暗黑模式', link: '/zh/dark' },
                { text: '国际化', link: '/zh/internationalization' },
                { text: '二次开发指南', link: '/zh/dev' },
                { text: '意见&建议&捐赠', link: '/zh/advice' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        logo: '/favicon.svg',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/en/introduce' },
          { text: 'Form Design', link: '/en/form-design' }
        ],
        search: {
          provider: 'local'
        },

        sidebar: {
          '/en/': [
            {
              text: 'Basics',
              items: [
                { text: 'Introduction', link: '/en/introduce' },
                { text: 'Quick Start', link: '/en/use' }
              ]
            },
            {
              text: 'Advanced',
              items: [
                { text: 'JsonSchema in Detail', link: '/en/schema' },
                { text: 'Form Linkage', link: '/en/linkage' },
                { text: 'Deep Data Binding', link: '/en/deepName' }
              ]
            },
            {
              text: 'Components',
              items: [
                { text: 'Form Design', link: '/en/form-design-doc' },
                { text: 'Form Render', link: '/en/form-render-doc' }
              ]
            },
            {
              text: 'Extensions',
              items: [
                { text: 'Extend Form Designer', link: '/en/extend' },
                { text: 'Extend a Markdown Input Box', link: '/en/extendMd' }
              ]
            },
            {
              text: 'More',
              items: [
                { text: 'Type Declarations', link: '/en/interface' },
                { text: 'Dark Mode', link: '/en/dark' },
                { text: 'Internationalization', link: '/en/internationalization' }
              ]
            }
          ]
        }
      }
    }
  }
})
