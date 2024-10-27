import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'

export default {
  name: '日期选择器',
  component: 'ElDatePicker',
  icon: h(Icon, { name: 'datePicker' }),
  type: 'basic',
  order: 9,
  initialValues: {
    label: '日期选择器',
    component: 'DatePicker',
    props: {
      type: 'datetime',
      placeholder: '请选择日期',
      clearable: false
    },
  },
  attrSchema
} satisfies FormElement
