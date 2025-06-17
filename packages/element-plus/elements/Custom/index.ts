import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@form-magic/core'
import type { FormElement } from '@/types/index'
import attrSchema from './attrSchema'

export default {
  title: '自定义组件',
  component: 'Custom',
  render: defineAsyncComponent(() => import('./Custom.vue')),
  icon: h(Icon, { name: 'custom' }),
  type: 'high',
  order: 99,
  attrSchema
} satisfies FormElement
