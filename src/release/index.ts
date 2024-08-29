import { FormDesign, FormRender } from '@/components'
import type {
  $Global,
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData
} from '@/config/commonType'
import { $global } from '@/config/symbol'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import axios, { type AxiosInstance, type AxiosStatic } from 'axios'
import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css'
import 'highlight.js/lib/common'
import 'highlight.js/styles/panda-syntax-dark.css'
import type { App } from 'vue'
import elements from '@/elements'

type Options = {
  request?: AxiosStatic | AxiosInstance | Function
  extendElements?: Record<string, FormElement>
}

const install = function (app: App<Element>, options?: Options) {
  const globalConfig = {
    request: axios,
    elements
  }

  if (options) {
    Object.assign(globalConfig, options)
    Object.assign(globalConfig.elements, options.extendElements)
  }

  app.provide($global, globalConfig)

  app.use(hljsVuePlugin)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)

  app.directive('el-loading', ElLoading.directive)
}

export default { install }

export { FormDesign, FormRender }

export type { $Global, FormElement, FormItemType, FormSchema, TemplateData }
