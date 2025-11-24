import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Select from './Select.vue'

export default {
  title: '下拉选择框',
  type: 'basic',
  icon: 'select',
  component: 'Select',
  render: Select,
  order: 3,
  attrSchema
} satisfies FormElement
