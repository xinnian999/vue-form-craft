import axios from 'axios'
import { ElLoading } from 'element-plus'
import { FormRender, FormDesign } from '@/components'
import { $global } from '@/config/symbol'
import mergeElements from './mergeElements'
import type { App } from 'vue'
import type {
  FormSchema,
  FormContext,
  FormItemType,
  FormElement,
  $Global,
  TemplateData
} from '@/config/commonType'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/panda-syntax-dark.css'
import 'highlight.js/lib/common'
import 'element-plus/dist/index.css'

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

export type { FormSchema, FormContext, FormItemType, FormElement, $Global, TemplateData }
