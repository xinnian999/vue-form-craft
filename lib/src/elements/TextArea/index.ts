import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import TextArea from './TextArea.vue'

export default {
  title: '多行输入框',
  component: 'TextArea',
  icon: 'textarea',
  type: 'basic',
  order: 2,
  attrSchema,
  render: TextArea
} satisfies FormElement
