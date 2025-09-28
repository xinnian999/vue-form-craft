import { Icon } from '@/components'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@vue-form-craft/core'
import attrSchema from './attrSchema'

export default {
  title: '多选框组',
  icon: h(Icon, { name: 'checkbox' }),
  type: 'basic',
  component: 'Checkbox',
  render: defineAsyncComponent(() => import('./Checkbox.vue')),
  order: 4,
  attrSchema
} satisfies FormElement
