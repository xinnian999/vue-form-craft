import attrSchema from './attrSchema'
import type { FormElement } from '@form-magic/core'
import { Icon } from '@form-magic/core'
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
