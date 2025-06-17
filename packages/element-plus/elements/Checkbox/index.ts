import type { FormElement } from '@/types/index'
import attrSchema from './attrSchema'
import { defineAsyncComponent, h } from 'vue'
import Icon from '@/icons'

export default {
  title: '多选框组',
  icon: h(Icon, { name: 'checkbox' }),
  type: 'basic',
  component: 'Checkbox',
  render: defineAsyncComponent(() => import('./Checkbox.vue')),
  order: 4,
  attrSchema
} satisfies FormElement
