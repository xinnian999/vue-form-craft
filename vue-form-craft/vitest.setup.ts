import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import * as elements from '@/elements'
import { $globals } from '@/symbol'

config.global.plugins = [ElementPlus]
config.global.provide = {
  [$globals]: {
    lang: 'zh',
    elements
  }
}
