import attr from './attr'
import Checkbox from './Checkbox.vue'

export default {
  name: '多选框组',
  icon: 'checkbox',
  type: 'basic',
  component: Checkbox,
  order: 4,
  initialValues: {
    label: '多选框组',
    component: 'Checkbox',
    props: {
      placeholder: '请选择...',
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      labelKey: 'label',
      valueKey: 'value'
    }
  },
  attr
}
