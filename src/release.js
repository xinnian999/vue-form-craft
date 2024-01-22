import axios from 'axios'
import { SchemaForm } from '@/components'
import FormDesign from './FormDesign/index.vue'
import IconRender from '@/components/IconRender.vue'
import * as Directives from '@/directive'
import { MdPreview, MdCatalog, MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import 'element-plus/dist/index.css'

const components = [SchemaForm, FormDesign, IconRender, MdPreview, MdCatalog, MdEditor] // 全局组件列表

const install = function (app, options = {}) {
  const { request = axios, getSchema } = options
  app.provide('$request', request)
  app.provide('$getSchema', getSchema)
  // 注册组件
  components.forEach((component) => {
    app.component(component.name, component)
  })
  // 注册指令
  Object.values(Directives).forEach((fn) => fn(app))
}

export { SchemaForm, FormDesign } //实现按需引入*

export default { install } //用来给Vue全局挂载
