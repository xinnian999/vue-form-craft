import FormRender from '@/form-render'
import FormDesign from '@/form-design'
import { $options } from '@/config/symbol'
import { type App } from 'vue'
import type { Options } from '@form-magic/core'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($options, options)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}