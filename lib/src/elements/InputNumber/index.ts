import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '数字输入框',
  icon: 'inputNumber',
  type: 'basic',
  order: 2.9,
  component: 'InputNumber',
  render: Component,
  attrSchema
} satisfies FormElement
