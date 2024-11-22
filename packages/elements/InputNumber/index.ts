import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'

export default {
  title: '计数器',
  icon: h(Icon, { name: 'inputNumber' }),
  type: 'basic',
  order: 5,
  component: 'InputNumber',
  render: defineAsyncComponent(() => import('./Component.vue')),
  attrSchema
} satisfies FormElement
