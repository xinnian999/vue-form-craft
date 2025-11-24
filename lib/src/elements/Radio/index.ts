import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Radio from './Radio.vue'

export default {
  title: '单选框组',
  icon: 'radio',
  type: 'basic',
  component: 'Radio',
  render: Radio,
  order: 3.5,
  attrSchema
} satisfies FormElement
