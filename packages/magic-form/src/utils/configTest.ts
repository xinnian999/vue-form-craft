import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { $globals } from '@magic-form/core'
import { mergeGlobals } from '@/utils'

export default () => {
  config.global.plugins = [ElementPlus]
  config.global.provide = {
    [$globals]: mergeGlobals({
      lang: 'zh'
    })
  }
}
