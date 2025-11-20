import type { FormElement } from '@/types'
import attrSchema from './colorPickerAttrSchema'

export default {
  title: '颜色选择器',
  component: 'ColorPicker',
  render: 'ElColorPicker',
  icon: 'colorPicker',
  type: 'basic',
  order: 9,
  attrSchema
} satisfies FormElement
