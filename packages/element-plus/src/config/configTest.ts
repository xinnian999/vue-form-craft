import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'

import provide from './provide'

export default () => {
  config.global.plugins = [ElementPlus]
  config.global.provide = provide
}
