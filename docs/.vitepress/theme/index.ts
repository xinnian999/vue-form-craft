import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

const modules = import.meta.glob('../../demo/**/*', { eager: true })

const components = Object.entries(modules).map(([path, module]) => {
  const componentName = path
    .replaceAll('../', '')
    .replaceAll('./', '')
    .replaceAll('/', '-')
    .replace(/\.\w+$/, '')
  return {
    name: componentName,
    component: (module as any).default
  }
})

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const { default: VueFormCraft } = await import('vue-form-craft')
      const { default: ElementPlus } = await import('element-plus')
      const { default: request } = await import('./request')
      const { default: DemoContainer } = await import('./DemoContainer/index.vue')

      app.use(ElementPlus)
      app.use(VueFormCraft, { request })

      app.component('DemoContainer', DemoContainer)

      components.forEach(({ name, component }) => {
        app.component(name, component)
      })
    }
  }
} satisfies Theme
