import attrSchema from './attrSchema'
import type { FormElement } from '@/types/index'
import Icon from '@/icons'
import { h } from 'vue'

export default {
  title: '日期选择器',
  component: 'DatePicker',
  render: 'ElDatePicker',
  icon: h(Icon, { name: 'datePicker' }),
  type: 'basic',
  order: 9,
  attrSchema
} satisfies FormElement
