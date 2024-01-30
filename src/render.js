import { createApp } from 'vue'
import router from './router'
// import VueFormCraft from '../dist/vue-form-craft.mjs'
import VueFormCraft from './release'
import { request } from '@/utils'
import '@arco-design/web-vue/dist/arco.css'
import { Switch, Input, Form } from '@arco-design/web-vue'

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
    },
    customForm: {
      component: Form,
      parameterMapping: { model: 'model', labelPosition: 'label-align', size: 'size' }
    },
    customFormItem: Form.Item
    // customElements: {
    //   Switch: {
    //     component: Switch
    //   },
    //   Input: {
    //     component: Input
    //   }
    // }
  })

  app.mount(dom)
}

export default render
