import { FormRender, FormDesign } from '@/components'
import { $globals } from '@vue-form-craft/core'
import { type App } from 'vue'
import type { Options } from '@vue-form-craft/core'
import { mergeGlobals } from '@/utils'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($globals, mergeGlobals(options))

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
