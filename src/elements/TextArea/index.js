import { ElInput } from 'element-plus'
import { h } from 'vue'
import attr from './attr'

export default {
  name: '多行文本',
  component: h(ElInput, { type: 'textarea', showWordLimit: true, autocomplete: 'off' }),
  icon: 'textarea',
  type: 'basic',
  order: 2,
  initialValues: {
    label: '多行文本',
    component: 'Textarea',
    props: {
      autosize: { minRows: 4, maxRows: 999 },
      placeholder: '请输入...'
    }
  },
  attr
}
