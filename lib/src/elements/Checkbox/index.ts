import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Checkbox from './Checkbox.vue'

export default {
  title: '多选框组',
  icon: 'checkbox',
  type: 'basic',
  component: 'Checkbox',
  render: Checkbox,
  order: 4,
  attrSchema
} satisfies FormElement
