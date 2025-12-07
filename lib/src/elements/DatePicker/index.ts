import { ElDatePicker } from 'element-plus'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '日期选择器',
  component: 'DatePicker',
  render: ElDatePicker,
  icon: 'datePicker',
  type: 'basic',
  order: 9,
  attrSchema
} satisfies FormElement
