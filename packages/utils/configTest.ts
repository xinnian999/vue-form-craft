import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { $options } from '@vue-form-craft/config'

export default () => {
  config.global.plugins = [ElementPlus]
  config.global.provide = {
    [$options]: {
      lang: 'zh'
    }
  }
}
