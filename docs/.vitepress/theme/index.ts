import type { Theme } from 'vitepress'
import { mdVueDemo } from 'vitepress-vue-demo'
import DefaultTheme from 'vitepress/theme'
import 'vitepress-vue-demo/dist/style.css'
import type { Component } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import ArcoVue from '@arco-design/web-vue'
import components from './components/index'
import Layout from './Layout.vue'
import '@arco-design/web-vue/dist/arco.css'
import './custom.css'

const modules = import.meta.glob<Component>('../../demo/**/*', { eager: true, import: 'default' })

export default {
  extends: DefaultTheme,
  Layout,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const { default: VueFormCraft } = await import('form-craft')
      const { default: ElementPlus } = await import('element-plus')
      const { default: request } = await import('./request')
      const { default: extendElements } = await import('./extendElements')

      const mode = import.meta.env.MODE
      const cozeToken = import.meta.env.VITE_COZE_TOKEN

      app.use(ElementPlus)
      app.use(ArcoVue)
      app.use(VueFormCraft, {
        request,
        extendElements,
        ai: {
          token: mode === 'production' ? null : cozeToken
        }
      })
      app.use(components)

      app.use(mdVueDemo, { modules })
    }
  }
} satisfies Theme
