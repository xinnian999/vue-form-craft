import axios, { type AxiosInstance } from 'axios'
import { FormRender, FormDesign } from '@/components'
import IconRender from '@/components/IconRender.vue'
import { $global } from '@/config/symbol'
import * as Directives from '@/directive'
import 'element-plus/dist/index.css'
import mergeElements from './mergeElements'
import customIconSelect from './customIconSelect'
import type { App } from 'vue'
import type {
  anyObject,
  schemaType,
  formValuesType,
  contextType,
  formItemType,
  formItemsType,
  formElement,
  changeItemType,
  $globalType,
  iconSelectConfigType,
  templateDataType
} from '@/config/commonType'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

type $optionsType = {
  request?: AxiosInstance
  getSchema?: (schemaId: string) => Promise<schemaType>
  elements?: { [key: string]: formElement }
  iconSelectConfig?: iconSelectConfigType
  customElements?: { [key: string]: formElement }
}

const components = [FormRender, FormDesign, IconRender] // 全局组件列表

const install = function (app: App<Element>, options: $optionsType = {}) {
  const { request = axios, getSchema, customElements = {}, iconSelectConfig } = options

  app.use(hljsVuePlugin)

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

export { FormDesign, FormRender }

export type {
  anyObject,
  schemaType,
  formValuesType,
  contextType,
  formItemType,
  formItemsType,
  formElement,
  changeItemType,
  $globalType,
  iconSelectConfigType,
  templateDataType
}
