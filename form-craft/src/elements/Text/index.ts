import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '文本',
  component: 'Text',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'text' }),
  type: 'assist',
  order: 1,
  attrSchema
} satisfies FormElement
