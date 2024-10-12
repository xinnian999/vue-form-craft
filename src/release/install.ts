import { FormDesign, FormRender } from '@vue-form-craft/components'
import type { $Global } from '@vue-form-craft/config/commonType'
import { $global } from '@vue-form-craft/config/symbol'
import { ref, type App } from 'vue'
import elements from '@vue-form-craft/elements'

type Options = {
  request?: $Global['request']
  extendElements?: $Global['elements']
  lang?: 'zh' | 'en'
}

export default (app: App<Element>, options?: Options) => {
  const globalConfig = {
    elements
  }

  if (options) {
    Object.assign(globalConfig, options)
    Object.assign(globalConfig.elements, options.extendElements)
  }

  app.provide($global, globalConfig)

  if (options?.lang) {
    app.provide('vfc-lang', ref(options.lang))
  }

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
