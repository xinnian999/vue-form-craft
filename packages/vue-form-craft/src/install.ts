import FormRender from './components/form-render'
import FormDesign from './components/form-design'
import { $options } from '@/config/symbol'
import { type App } from 'vue'
import type { Options } from '@/types'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($options, options)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}