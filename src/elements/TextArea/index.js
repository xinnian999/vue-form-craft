import { ElInput } from 'element-plus'
import attr from './attr'

export default {
  name: '多行文本',
  component: ElInput,
  icon: 'textarea',
  type: 'basic',
  order: 2,
  initialValues: {
    label: '多行文本',
    component: 'Textarea',
    props: {
      autocomplete: 'off',
      showWordLimit: true,
      type: 'textarea',
      autosize: { minRows: 4, maxRows: 999 }
    }
  },
  attr
}
