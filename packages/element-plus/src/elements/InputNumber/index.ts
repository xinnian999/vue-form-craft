import { Icon } from '@form-magic/core'
import attrSchema from './attrSchema'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@form-magic/core'

export default {
  title: '计数器',
  icon: h(Icon, { name: 'inputNumber' }),
  type: 'basic',
  order: 5,
  component: 'InputNumber',
  render: defineAsyncComponent(() => import('./Component.vue')),
  attrSchema
} satisfies FormElement
