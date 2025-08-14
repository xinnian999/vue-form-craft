import { FormRender, FormDesign } from '@/components'
import { $options } from '@/config/symbol'
import { type App } from 'vue'
import type { Options } from '@magic-form/core'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($options, options)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
