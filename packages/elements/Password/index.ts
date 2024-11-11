import { ElInput } from 'element-plus'
import attrSchema from './attrSchema'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'

export default {
  title: '密码输入框',
  component: 'Password',
  render: h(ElInput, { type: 'password', showWordLimit: true, autocomplete: 'off' }),
  icon: h(Icon, { name: 'password' }),
  type: 'basic',
  order: 3,
  attrSchema
} satisfies FormElement
