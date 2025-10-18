import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
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
