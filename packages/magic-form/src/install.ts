import { FormRender, FormDesign } from '@/components'
import { $options, $Message } from '@magic-form/core'
import { type App } from 'vue'
import type { Options } from '@magic-form/core'
import { ElMessage } from 'element-plus'

export default (app: App<Element>, options: Options = {}) => {
  app.provide($options, options)

  app.provide($Message, {
    success: (msg: string) => {
      ElMessage.success(msg)
    }
  })

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
