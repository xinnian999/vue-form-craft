// import { ElInput } from 'element-plus'
import { Input } from '@arco-design/web-vue'
import attr from './attr'

export default {
  name: '单行文本',
  component: Input,
  icon: 'input',
  type: 'basic',
  order: 1,
  initialValues: {
    label: '单行文本',
    component: 'Input',
    props: {
      autocomplete: 'off',
      showWordLimit: true,
      type: 'text'
    }
  },
  attr
}
