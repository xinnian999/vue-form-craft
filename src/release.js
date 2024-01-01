import { SchemaForm } from '@/components' // 引入封装好的组件
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import axios from 'axios'
import FormDesign from '@/views/FormDesign/index.vue'
import IconRender from '@/components/IconRender.vue'
import * as Directives from '@/directive'

FormDesign.__name = 'FormDesign'

const components = [SchemaForm, FormDesign, IconRender] // 将来如果有其它组件,都可以写到这个数组里

const install = function (app, options) {
  app.use(ElementPlus)
  app.provide('$request', options.request || axios)
  // 注册组件
  components.forEach((component) => {
    app.component(component.__name, component)
  })
  // 注册指令
  Object.values(Directives).forEach((fn) => fn(app))
}

export { SchemaForm, FormDesign } //实现按需引入*

export default { install } //用来给Vue全局挂载
