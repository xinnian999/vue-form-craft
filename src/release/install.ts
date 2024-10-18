import { FormDesign, FormRender } from '@vue-form-craft/components'
import { $options } from '@vue-form-craft/config/symbol'
import { type App } from 'vue'
import type { Options } from '@vue-form-craft/config/commonType'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($options, options)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
