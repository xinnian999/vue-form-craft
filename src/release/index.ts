import axios, { type AxiosInstance } from 'axios'
import { SchemaForm, RemoteSchemaForm, RemoteFormDesign, FormDesign } from '@/components'
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
  iconSelectConfigType
} from '@/config/commonType'

type $optionsType = {
  request?: AxiosInstance
  getSchema?: (schemaId: string) => Promise<schemaType>
  elements?: { [key: string]: formElement }
  iconSelectConfig?: iconSelectConfigType
  customElements?: { [key: string]: formElement }
}

const components = [SchemaForm, FormDesign, RemoteSchemaForm, RemoteFormDesign, IconRender] // 全局组件列表

const install = function (app: App<Element>, options: $optionsType = {}) {
  const { request = axios, getSchema, customElements = {}, iconSelectConfig } = options

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

export { FormDesign, SchemaForm, RemoteSchemaForm, RemoteFormDesign }

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
  iconSelectConfigType
}
