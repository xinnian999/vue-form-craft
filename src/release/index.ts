import axios, { type AxiosInstance } from 'axios'
import { FormRender, FormDesign } from '@/components'
import IconRender from '@/components/IconRender.vue'
import { $global } from '@/config/symbol'
import 'element-plus/dist/index.css'
import mergeElements from './mergeElements'
import type { App } from 'vue'
import type {
  FormSchema,
  FormContext,
  FormItemType,
  FormElement,
  $globalType,
  iconSelectConfigType,
  TemplateData
} from '@/config/commonType'
import 'highlight.js/styles/panda-syntax-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import { ElLoading } from 'element-plus'

type $optionsType = {
  request?: AxiosInstance
  getSchema?: (schemaId: string) => Promise<FormSchema>
  elements?: { [key: string]: FormElement }
  customElements?: { [key: string]: FormElement }
}

const components = [FormRender, FormDesign, IconRender] // 全局组件列表

const install = function (app: App<Element>, options: $optionsType = {}) {
  const { request = axios, getSchema, customElements = {} } = options

  app.use(hljsVuePlugin)

  app.provide($global, {
    request,
    getSchema,
    elements: mergeElements(customElements)
  })

  // 注册组件
  components.forEach((component) => {
    app.component(component.name, component)
  })

  app.directive('el-loading', ElLoading.directive)
}

export default { install }

export { FormDesign, FormRender }

export type {
  FormSchema,
  FormContext,
  FormItemType,
  FormElement,
  $globalType,
  iconSelectConfigType,
  TemplateData
}
