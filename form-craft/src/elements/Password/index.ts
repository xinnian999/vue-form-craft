import { h } from 'vue'
import inputAttrSchema from '@/elements/Input/inputAttrSchema'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import Password from './Password.vue'

export default {
  title: '密码输入框',
  component: 'Password',
  render: Password,
  icon: h(Icon, { name: 'password' }),
  type: 'basic',
  order: 3,
  attrSchema: inputAttrSchema
} satisfies FormElement
