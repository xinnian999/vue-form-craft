import { createApp } from 'vue'
import router from './router'
import VueFormCraft from './release/index'
import { request } from '@/utils'
import { MdPreview, MdCatalog, MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import type { Component } from 'vue'

const components = [MdPreview, MdCatalog, MdEditor] // 全局组件列表

const render = (component: Component, dom: string | Element) => {
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

  // 注册组件
  components.forEach((component) => {
    app.component(component.name, component)
  })

  app.mount(dom)
}

export default render
