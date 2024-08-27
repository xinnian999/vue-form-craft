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
import axios from 'axios'
import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css'
import 'highlight.js/lib/common'
import 'highlight.js/styles/panda-syntax-dark.css'
import type { App } from 'vue'
import mergeElements from './mergeElements'

const install = function (app: App<Element>, options?: $Global) {
  if (options) {
    const { request = axios, customElements = {} } = options
    app.provide($global, {
      request,
      elements: mergeElements(customElements)
    })
  }

  app.use(hljsVuePlugin)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)

  app.directive('el-loading', ElLoading.directive)
}

export default { install }

export { FormDesign, FormRender }

export type { $Global, FormElement, FormItemType, FormSchema, TemplateData }

