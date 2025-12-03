import { type App } from 'vue'
import { FormDesign, FormRender } from '@/components'
import customComponents from '@/components/customComponents'
import * as elements from '@/elements'
import { $globals, $uiAdapter } from '@/symbol'
import type { Options } from '@/types'
import ElementPlusAdapter from '@/uiAdapter/ElementPlusAdapter'

export default (app: App<Element>, options: Options = {}) => {
  // 注入全局配置
  app.provide($globals, {
    ...options,
    elements: {
      ...elements,
      ...options.extendElements
    }
  })

  // 注入 UI 适配器（默认使用 Element-Plus）
  const uiAdapter = options.ui || ElementPlusAdapter
  app.provide($uiAdapter, uiAdapter)

  customComponents(app)

  app.component('FormRender', FormRender)
  app.component('FormDesign', FormDesign)
}
