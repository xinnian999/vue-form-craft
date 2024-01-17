import { createApp } from 'vue'
import router from './router'
// import VueFormCraft from '../dist/vue-form-craft.mjs'
import VueFormCraft from './release'
import { request } from '@/utils'

const render = (component, dom) => {
  const app = createApp(component)

  app.use(router)
  app.use(VueFormCraft, {
    request,
    getSchema: async (schemaId) => {
      const { data } = await request({
        url: 'https://hyl999.co:7777/current/query/form',
        params: {
          filters: {
            id: schemaId
          }
        }
      })
      return JSON.parse(data[0].formSchema)
    }
  })

  app.mount(dom)
}

export default render
