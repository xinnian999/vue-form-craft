import { h } from 'vue'
import { Icon } from '@form-magic/core'
import type { FormElement } from '@form-magic/core'
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
