import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { mdVueDemo } from 'vitepress-vue-demo'
import 'vitepress-vue-demo/dist/style.css'
import type { Component } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import Layout from './Layout.vue'
import components from './components/index'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import './custom.css'

const modules = import.meta.glob<Component>('../../demo/**/*', { eager: true, import: 'default' })

export default {
  extends: DefaultTheme,
  Layout,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const { default: VueFormCraft } = await import('vue-form-craft')
      const { default: ElementPlus } = await import('element-plus')
      const { default: request } = await import('./request')
      const { default: extendElements } = await import('./extendElements')

      app.use(ElementPlus)
      app.use(ArcoVue)
      app.use(VueFormCraft, { request, extendElements })
      app.use(components)

      app.use(mdVueDemo, { modules })
    }
  }
} satisfies Theme
