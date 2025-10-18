import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
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
