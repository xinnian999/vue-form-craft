import type { FormElement } from '@/types'
import Component from './Component.vue'
import attrSchema from './inputNumberAttrSchema'

export default {
  title: '计数器',
  icon: 'inputNumber',
  type: 'basic',
  order: 5,
  component: 'InputNumber',
  render: Component,
  attrSchema
} satisfies FormElement
