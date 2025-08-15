import { FormRender, FormDesign } from '@/components'
import { $globals } from '@magic-form/core'
import { type App } from 'vue'
import type { Options } from '@magic-form/core'
import { mergeGlobals } from '@/utils'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($globals, mergeGlobals(options))

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
