import axios from 'axios'
import { SchemaForm, RemoteSchemaForm, RemoteFormDesign } from '@/components'
import FormDesign from './FormDesign/index.vue'
import IconRender from '@/components/IconRender.vue'
import * as Directives from '@/directive'
import { MdPreview, MdCatalog, MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import 'element-plus/dist/index.css'
import { props } from '@/elements/commonAttr'

const modules = import.meta.glob('@/elements/*/index.js', { eager: true })
const elements = {}
for (const path in modules) {
  const data = modules[path].default

  if (data) {
    elements[data.initialValues.component] = data
  }
}

const icons = import.meta.glob('@/icons/*.vue', { eager: true })

const iconList = Object.entries(icons).map(([key, value]) => {
  return key.match(/\/([^\/]+)\.vue$/)[1]
})

const components = [
  SchemaForm,
  FormDesign,
  RemoteSchemaForm,
  IconRender,
  MdPreview,
  MdCatalog,
  MdEditor,
  RemoteFormDesign
] // 全局组件列表

const install = function (app, options = {}) {
  const {
    request = axios,
    getSchema,
    customElements = {},
    icon = { component: IconRender, propKey: 'name', iconList }
  } = options

  const mergeElements = {}

  Object.entries(elements).forEach(([key, value]) => {
    const customData = customElements[key]
    if (customData) {
      return (mergeElements[key] = {
        ...value,
        component: customData.component,
        attr: customData.propAttrs
          ? value.attr.map((item) =>
              item.name === 'props'
                ? { ...item, children: [...props, ...customData.propAttrs] }
                : item
            )
          : value.attr
      })
    }

    return (mergeElements[key] = value)
  })

  app.provide('$request', request)
  app.provide('$getSchema', getSchema)
  app.provide('$elements', mergeElements)
  app.provide('$icon', icon)

  // 注册组件
  components.forEach((component) => {
    app.component(component.name, component)
  })
  // 注册指令
  Object.values(Directives).forEach((fn) => fn(app))
}

export { SchemaForm, FormDesign } //实现按需引入*

export default { install } //用来给Vue全局挂载
