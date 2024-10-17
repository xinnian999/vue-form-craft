import { FormDesign, FormRender } from '@vue-form-craft/components'
import { $elements, $request } from '@vue-form-craft/config/symbol'
import { ref, type App } from 'vue'
import elements from '@vue-form-craft/elements'
import type { FormElement } from '@vue-form-craft/config/commonType'

type Options = {
  request?: (options: Record<string, any>) => Promise<Record<string, any>>
  extendElements?: Record<string, FormElement>
  lang?: 'zh' | 'en'
}

export default (app: App<Element>, options?: Options) => {
  if (options) {
    if (options.lang) {
      app.provide('vfc-lang', ref(options.lang))
    }

    if (options.extendElements) {
      app.provide($elements, { ...elements, ...options.extendElements })
    }

    if (options.request) {
      app.provide($request, options.request)
    }
  }

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
