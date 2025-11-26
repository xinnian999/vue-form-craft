import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '计数器',
  icon: 'inputNumber',
  type: 'basic',
  order: 5,
  component: 'InputNumber',
  render: Component,
  attrSchema
} satisfies FormElement
