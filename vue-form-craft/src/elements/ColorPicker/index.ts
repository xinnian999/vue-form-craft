import { h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '颜色选择器',
  component: 'ColorPicker',
  render: 'ElColorPicker',
  icon: h(Icon, { name: 'colorPicker' }),
  type: 'basic',
  order: 9,
  attrSchema
} satisfies FormElement
