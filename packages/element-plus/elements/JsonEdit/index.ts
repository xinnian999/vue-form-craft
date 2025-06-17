import type { FormElement } from '@/types/index'
import attrSchema from './attrSchema'
import Icon from '@/icons'
import { defineAsyncComponent, h } from 'vue'

export default {
  title: 'JSON编辑',
  component: 'JsonEdit',
  icon: h(Icon, { name: 'jsonEdit' }),
  type: 'basic',
  order: 14,
  attrSchema,
  render: defineAsyncComponent(() => import('./JsonEdit.vue'))
} satisfies FormElement
