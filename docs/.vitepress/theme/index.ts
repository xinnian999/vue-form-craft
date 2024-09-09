import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { mdVueDemo } from 'vitepress-vue-demo'
import 'vitepress-vue-demo/dist/style.css'
import type { Component } from 'vue'

const modules = import.meta.glob<Component>('../../demo/**/*', { eager: true, import: 'default' })

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const { default: VueFormCraft } = await import('vue-form-craft')
      const { default: ElementPlus } = await import('element-plus')
      const { default: request } = await import('./request')
      // const { default: DemoContainer } = await import('./DemoContainer/index.vue')

      app.use(ElementPlus)
      app.use(VueFormCraft, { request })

      app.use(mdVueDemo, { modules })
    }
  }
} satisfies Theme
