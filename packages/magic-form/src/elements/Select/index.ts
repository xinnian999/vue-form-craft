import type { FormElement } from '@magic-form/core'
import attrSchema from './attrSchema'
import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@magic-form/core'

export default {
  title: '下拉选择框',
  type: 'basic',
  icon: h(Icon, { name: 'select' }),
  component: 'Select',
  render: defineAsyncComponent(() => import('./Select.vue')),
  order: 3,
  attrSchema
} satisfies FormElement
