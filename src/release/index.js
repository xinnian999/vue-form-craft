import axios from 'axios'
import { SchemaForm, RemoteSchemaForm, RemoteFormDesign, FormDesign } from '@/components'
import IconRender from '@/components/IconRender.vue'
import { $global } from '@/config/symbol'
import { mergeAttr, basicAttr } from '@/config/commonAttr'
import * as Directives from '@/directive'
import 'element-plus/dist/index.css'
import mergeElements from './mergeElements'
import customIconSelect from './customIconSelect'

const components = [SchemaForm, FormDesign, RemoteSchemaForm, RemoteFormDesign, IconRender] // 全局组件列表

const install = function (app, options = {}) {
  const { request = axios, getSchema, customElements = {}, iconSelectConfig = {} } = options

  app.provide($global, {
    request,
    getSchema,
    elements: mergeElements(customElements),
    iconSelectConfig: customIconSelect(iconSelectConfig)
  })

  // 注册组件
  components.forEach((component) => {
    app.component(component.name, component)
  })
  // 注册指令
  Object.values(Directives).forEach((fn) => fn(app))
}

export default { install }

export { mergeAttr, basicAttr }
