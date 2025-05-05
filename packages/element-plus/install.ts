import FormRender from '@vue-form-craft/element-plus/form-render'
import FormDesign from '@vue-form-craft/element-plus/form-design'
import { $options } from '@vue-form-craft/element-plus/config/symbol'
import { type App } from 'vue'
import type { Options } from '@vue-form-craft/element-plus/types'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($options, options)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}