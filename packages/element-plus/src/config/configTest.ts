import { config } from '@vue/test-utils'
import ElementPlus, { ElMessage } from 'element-plus'
import { $components, $elements, $options } from '@form-magic/core'
import * as elements from '@/elements'
import { elements as coreElements } from '@form-magic/core'

export default () => {
  config.global.plugins = [ElementPlus]
  config.global.provide = {
    [$options]: {
      lang: 'zh'
    },
    [$elements]: { ...coreElements, ...elements },
    [$components]: {
      successMessage: (msg: string) => ElMessage.success(msg)
    }
  }
}
