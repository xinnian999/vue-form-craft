import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '日期选择器',
  component: 'DatePicker',
  render: Component,
  icon: 'datePicker',
  type: 'basic',
  order: 9,
  attrSchema
} satisfies FormElement
