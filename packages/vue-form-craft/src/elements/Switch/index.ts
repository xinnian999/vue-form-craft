import { Icon } from '@/components'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '开关',
  render: defineAsyncComponent(() => import('./Component.vue')),
  component: 'Switch',
  icon: h(Icon, { name: 'switch' }),
  type: 'basic',
  order: 8,
  attrSchema
} satisfies FormElement
