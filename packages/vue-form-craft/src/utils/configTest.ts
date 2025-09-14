import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import ElementPlusX from 'vue-element-plus-x'
import { $globals } from '@vue-form-craft/core'
import { mergeGlobals } from '@/utils'

export default () => {
  config.global.plugins = [ElementPlus, ElementPlusX]
  config.global.provide = {
    [$globals]: mergeGlobals({
      lang: 'zh'
    })
  }
}
