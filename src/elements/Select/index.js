import {ElSwitch} from 'element-plus'
import attr from './attr'

export default {
  name: '下拉选择框',
  icon: 'select',
  type: 'basic',
  component: ElSwitch,
  order: 3,
  initialValues: {
    label: '下拉选择框',
    component: 'Select',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ]
    }
  },
  attr
}
