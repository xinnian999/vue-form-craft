import 'element-plus/dist/index.css'
import axios from 'axios'
import { FormDesign, SchemaForm } from '@/components'
import IconRender from '@/components/IconRender.vue'
import * as Directives from '@/directive'

FormDesign.__name = 'FormDesign'

const components = [SchemaForm, FormDesign, IconRender] // 全局组件列表

const install = function (app, options = {}) {
  const { request = axios, getSchema } = options
  app.provide('$request', request)
  app.provide('$getSchema', getSchema)

  // 注册组件
  components.forEach((component) => {
    app.component(component.__name, component)
  })
  // 注册指令
  Object.values(Directives).forEach((fn) => fn(app))
}

export { SchemaForm, FormDesign } //实现按需引入*

export default { install } //用来给Vue全局挂载
