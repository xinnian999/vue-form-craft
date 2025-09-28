import { Icon } from '@/components'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/core'
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
