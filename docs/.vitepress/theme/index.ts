import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { mdVueDemo } from 'vitepress-vue-demo'
import 'vitepress-vue-demo/dist/style.css'
import type { Component } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Layout from './Layout.vue'
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

      app.use(ElementPlus,{
        locale: zhCn,
      })
      app.use(VueFormCraft, { request,extendElements })

      app.use(mdVueDemo, { modules })
    }
  }
} satisfies Theme
