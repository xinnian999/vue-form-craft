import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import VueFormCraft from '@/release/index'


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    // @ts-ignore
    app.use(VueFormCraft)
  }
} satisfies Theme
