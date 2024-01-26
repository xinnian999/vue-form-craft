import { ElInput } from 'element-plus'
import { h } from 'vue'
import attr from './attr'

export default {
  name: '密码输入框',
  component: h(ElInput, { type: 'password', showWordLimit: true, autocomplete: 'off' }),
  icon: 'password',
  type: 'basic',
  order: 3,
  initialValues: {
    label: '密码输入框',
    component: 'Password'
  },
  attr
}
