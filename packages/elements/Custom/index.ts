import { h } from 'vue'
import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import component from './Component.vue'

export default {
  name: '自定义组件',
  component,
  icon: h(Icon, { name: 'custom' }),
  type: 'high',
  order: 99,
  initialValues: {
    label: '自定义组件',
    component: 'Custom'
  },
  attrSchema
} satisfies FormElement
