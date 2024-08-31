import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import request from './request'
import './custom.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const { default: VueFormCraft } = await import('vue-form-craft')
      app.use(VueFormCraft, { request })
    }
  }
} satisfies Theme
