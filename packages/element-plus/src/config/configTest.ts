import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { $elements, $options } from '@form-magic/core'
import * as elements from '@/elements'

export default () => {
  config.global.plugins = [ElementPlus]
  config.global.provide = {
    [$options]: {
      lang: 'zh'
    },
    [$elements]: elements
  }
}
