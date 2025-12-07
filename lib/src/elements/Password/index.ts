import inputAttrSchema from '@/elements/Input/inputAttrSchema'
import type { FormElement } from '@/types'
import Password from './Password.vue'

export default {
  title: '密码输入框',
  component: 'Password',
  render: Password,
  icon: 'password',
  type: 'basic',
  order: 2.5,
  attrSchema: inputAttrSchema
} satisfies FormElement
