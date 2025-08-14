import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { $options } from '@magic-form/core'

export default () => {
  config.global.plugins = [ElementPlus]
  config.global.provide = {
    [$options]: {
      lang: 'zh'
    }
  }
}
