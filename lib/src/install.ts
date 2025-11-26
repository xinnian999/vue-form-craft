import { type App } from 'vue'
import { FormDesign, FormRender } from '@/components'
import customComponents from '@/components/customComponents'
import * as elements from '@/elements'
import { $globals } from '@/symbol'
import type { Options } from '@/types'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($globals, {
    ...options,
    elements: {
      ...elements,
      ...options.extendElements
    }
  })

  customComponents(app)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
