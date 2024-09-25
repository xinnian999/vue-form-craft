import { FormDesign, FormRender } from '@/components'
import type { $Global } from '@/config/commonType'
import { $global } from '@/config/symbol'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/lib/common'
import 'highlight.js/styles/panda-syntax-dark.css'
import { ref, type App } from 'vue'
import elements from '@/elements'

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

    if (options.lang) {
      app.provide('vfc-lang', ref(options.lang))
    }
  }

  app.provide($global, globalConfig)

  app.use(hljsVuePlugin)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
