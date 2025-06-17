import attrSchema from './attrSchema'
import Icon from '@/icons'
import { h } from 'vue'
import type { FormElement } from '@/types/index'
import Password from './Password.vue'

export default {
  title: '密码输入框',
  component: 'Password',
  render: Password,
  icon: h(Icon, { name: 'password' }),
  type: 'basic',
  order: 3,
  attrSchema
} satisfies FormElement
