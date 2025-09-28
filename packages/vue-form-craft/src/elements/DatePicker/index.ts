import { Icon } from '@/components'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/core'
import attrSchema from './attrSchema'

export default {
  title: '日期选择器',
  component: 'DatePicker',
  render: 'ElDatePicker',
  icon: h(Icon, { name: 'datePicker' }),
  type: 'basic',
  order: 9,
  attrSchema
} satisfies FormElement
