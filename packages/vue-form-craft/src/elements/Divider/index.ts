import { Icon } from '@/components'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '分割线',
  component: 'Divider',
  render: defineAsyncComponent(() => import('./Divider.vue')),
  icon: h(Icon, { name: 'divider' }),
  type: 'assist',
  order: 6,
  attrSchema
} satisfies FormElement
