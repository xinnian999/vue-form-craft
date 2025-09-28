import { Icon } from '@/components'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@vue-form-craft/core'
import attrSchema from './attrSchema'

export default {
  title: '计数器',
  icon: h(Icon, { name: 'inputNumber' }),
  type: 'basic',
  order: 5,
  component: 'InputNumber',
  render: defineAsyncComponent(() => import('./Component.vue')),
  attrSchema
} satisfies FormElement
