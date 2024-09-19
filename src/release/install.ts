import { FormDesign, FormRender } from '@/components'
import type { $Global, FormElement } from '@/config/commonType'
import { $global } from '@/config/symbol'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import axios, { type AxiosInstance, type AxiosStatic } from 'axios'
import 'highlight.js/lib/common'
import 'highlight.js/styles/panda-syntax-dark.css'
import { ref, type App } from 'vue'
import elements from '@/elements'

type Options = {
  request?: AxiosStatic | AxiosInstance | Function
  extendElements?: Record<string, FormElement>
  lang?: 'zh' | 'en'
}

export default (app: App<Element>, options?: Options) => {
  const globalConfig: $Global = {
    request: axios,
    elements
  }

  if (options) {
    Object.assign(globalConfig, options)
    Object.assign(globalConfig.elements, options.extendElements)

    if (options.lang) {
      app.provide('vfc-lang', ref(options.lang))
    }
  }

  app.provide($global, globalConfig)

  app.use(hljsVuePlugin)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
