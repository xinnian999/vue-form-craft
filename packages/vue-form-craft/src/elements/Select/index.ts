import { Icon } from '@/components'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@vue-form-craft/core'
import attrSchema from './attrSchema'

export default {
  title: '下拉选择框',
  type: 'basic',
  icon: h(Icon, { name: 'select' }),
  component: 'Select',
  render: defineAsyncComponent(() => import('./Select.vue')),
  order: 3,
  attrSchema
} satisfies FormElement
