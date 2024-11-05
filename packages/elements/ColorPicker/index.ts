import { h } from 'vue'
import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'

export default {
  name: '颜色选择器',
  component: 'ElColorPicker',
  icon: h(Icon, { name: 'colorPicker' }),
  type: 'basic',
  order: 9,
  initialValues: {
    label: '颜色选择器',
    component: 'ColorPicker'
  },
  attrSchema
} satisfies FormElement
