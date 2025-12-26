import type { FormElement } from '@/types'
import Input from './Input.vue'
import attrSchema from './inputAttrSchema'

export default {
  title: '输入框',
  component: 'Input',
  icon: 'input',
  type: 'basic',
  order: 1,
  attrSchema,
  render: Input
} satisfies FormElement
