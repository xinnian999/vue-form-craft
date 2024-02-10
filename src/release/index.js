import axios from 'axios'
import { SchemaForm, RemoteSchemaForm, RemoteFormDesign } from '@/components'
import FormDesign from '@/FormDesign/index.vue'
import IconRender from '@/components/IconRender.vue'
import * as Directives from '@/directive'
import 'element-plus/dist/index.css'
import mergeElements from './mergeElements'
import customIconSelect from './customIconSelect'

const components = [SchemaForm, FormDesign, RemoteSchemaForm, RemoteFormDesign, IconRender] // 全局组件列表

const install = function (app, options = {}) {
  const { request = axios, getSchema, customElements = {}, icon = {} } = options

  app.provide('$request', request)
  app.provide('$getSchema', getSchema)
  app.provide('$elements', mergeElements(customElements))
  app.provide('$icon', customIconSelect(icon))

  // 注册组件
  components.forEach((component) => {
    app.component(component.name, component)
  })
  // 注册指令
  Object.values(Directives).forEach((fn) => fn(app))
}

export default { install } //用来给Vue全局挂载
