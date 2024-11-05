import { h } from 'vue'
import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import component from './Component.vue'

export default {
  name: '颜色输入框',
  component,
  icon: h(Icon, { name: 'colorPicker' }),
  type: 'highBasic',
  order: 2,
  initialValues: {
    label: '颜色输入框',
    component: 'ColorInput'
  },
  attrSchema
} satisfies FormElement
