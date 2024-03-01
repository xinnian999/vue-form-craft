import { createApp } from 'vue'
import router from './router'
// import VueFormCraft from './dist/vue-form-craft.mjs'
// import VueFormCraft from '../dist/vue-form-craft.mjs'
import VueFormCraft, { mergeAttr, basicAttr } from './release/index'
import { request } from '@/utils'
import { MdPreview, MdCatalog, MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
// import '@arco-design/web-vue/dist/arco.css'
// import { Switch, Input, Textarea, InputNumber } from '@arco-design/web-vue'
// import 'ant-design-vue/dist/resetFields.css'
import { Switch, Input, Textarea, InputNumber } from 'ant-design-vue'
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
    // iconSelectConfig: { component: IconRender, propKey: 'name' }
    // customElements: {
    //   Input: {
    //     component: Input,
    //     modelName: 'value'
    //   },
    //   Switch: {
    //     component: Switch,
    //     modelName: 'checked',
    //     attrs: mergeAttr({
    //       basic: basicAttr(),
    //       high: [
    //         { label: '打开时描述', component: 'Input', name: 'checked-text' },
    //         { label: '关闭时描述', component: 'Input', name: 'unchecked-text' }
    //       ]
    //     })
    //   },
    //   Textarea: {
    //     component: Textarea,
    //     modelName: 'value'
    //   },
    //   InputNumber: {
    //     component: InputNumber,
    //     modelName: 'value'
    //   }
    // }
  })

  // 注册组件
  components.forEach((component) => {
    app.component(component.name, component)
  })

  app.mount(dom)
}

export default render
