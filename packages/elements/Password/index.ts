import { ElInput } from 'element-plus'
import attrSchema from './attrSchema'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'

export default {
  name: '密码输入框',
  component: h(ElInput, { type: 'password', showWordLimit: true, autocomplete: 'off' }),
  icon: h(Icon, { name: 'password' }),
  type: 'basic',
  order: 3,
  initialValues: {
    label: '密码输入框',
    component: 'Password',
    props: {
      placeholder: '请输入密码'
    }
  },
  attrSchema
}