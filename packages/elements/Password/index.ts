import attrSchema from './attrSchema'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'
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
