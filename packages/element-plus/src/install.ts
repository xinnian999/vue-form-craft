// import { FormRender, FormDesign } from '@form-magic/components'
import { $options } from '@form-magic/core'
import { type App } from 'vue'
import type { Options } from '@form-magic/core'
import { provide } from '@/config'
import { FormRender, FormDesign } from '@form-magic/components'

export default (app: App<Element>, options: Options = {}) => {
  Reflect.ownKeys(provide).forEach((key) => {
    if (key === $options) {
      app.provide(key, options)
    } else {
      app.provide(key, provide[key as keyof typeof provide])
    }
  })

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
