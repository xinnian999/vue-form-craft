import { FormRender, FormDesign } from '@/components'
import { $components, $elements, $options } from '@form-magic/core'
import { type App } from 'vue'
import type { Options } from '@form-magic/core'
import * as elements from '@/elements'
import { elements as coreElements } from '@form-magic/core'
import { ElMessage } from 'element-plus'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($options, options)

  app.provide($elements, { ...coreElements, ...elements })

  app.provide($components, {
    successMessage: (msg: string) => ElMessage.success(msg)
  })

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
