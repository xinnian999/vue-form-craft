import { ElInput } from 'element-plus'
import { h } from 'vue'
import attr from './attr'

export default {
  name: '单行文本',
  component: h(ElInput, { showWordLimit: true, autocomplete: 'off' }),
  icon: 'input',
  type: 'basic',
  order: 1,
  initialValues: {
    label: '单行文本',
    component: 'Input',
    props: {
      placeholder: '请输入文本'
    }
  },
  attr
}
