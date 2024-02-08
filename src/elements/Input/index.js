import { ElInput } from 'element-plus'
import attr from './attr'

export default {
  name: '单行文本',
  component: ElInput,
  icon: 'input',
  type: 'basic',
  order: 1,
  initialValues: {
    label: '单行文本',
    component: 'Input',
    props: {
      autocomplete: 'off',
      showWordLimit: true,
      placeholder: '请输入文本'
    }
  },
  attr
}
