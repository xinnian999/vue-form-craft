import { ElInput } from 'element-plus'
import attr from './attr'

export default {
  name: '密码输入框',
  component: ElInput,
  icon: 'password',
  type: 'basic',
  order: 3,
  initialValues: {
    label: '密码输入框',
    component: 'Password',
    props: {
      autocomplete: 'off',
      showWordLimit: true,
      type: 'password'
    }
  },
  attr
}
