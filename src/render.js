import { createApp } from 'vue'
import router from './router'
// import VueFormCraft from '../dist/vue-form-craft.mjs'
import VueFormCraft from './release'
import { request } from '@/utils'

const render = (component, dom) => {
  const app = createApp(component)

  app.use(router)
  app.use(VueFormCraft, { request })

  app.mount(dom)
}

export default render
