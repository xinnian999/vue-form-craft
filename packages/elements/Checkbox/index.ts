import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import { defineAsyncComponent, h } from 'vue'
import Icon from '@vue-form-craft/icons'

export default {
  title: '多选框组',
  icon: h(Icon, { name: 'checkbox' }),
  type: 'basic',
  component: 'Checkbox',
  render: defineAsyncComponent(() => import('./Checkbox.vue')),
  order: 4,
  attrSchema
} satisfies FormElement
