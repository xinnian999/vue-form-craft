import { FormRender, FormDesign } from '@/components'
import { $elements, $options } from '@form-magic/core'
import { type App } from 'vue'
import type { Options } from '@form-magic/core'
import * as elements from '@/elements'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($options, options)

  app.provide($elements, elements)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
