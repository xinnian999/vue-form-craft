import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '自定义组件',
  component: 'Custom',
  render: defineAsyncComponent(() => import('./Custom.vue')),
  icon: h(Icon, { name: 'custom' }),
  type: 'basic',
  order: 99,
  attrSchema
} satisfies FormElement
