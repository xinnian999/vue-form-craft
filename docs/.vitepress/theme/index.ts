import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const { default: VueFormCraft } = await import('vue-form-craft')
      const { default: ElementPlus } = await import('element-plus')
      const { default: request } = await import('./request')
      const { default: Demo } = await import('./Demo.vue')

      app.use(ElementPlus)
      app.use(VueFormCraft, { request })

      app.component('Demo', Demo)
    }
  }
} satisfies Theme
