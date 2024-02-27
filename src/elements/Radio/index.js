import Radio from './Radio.vue'
import attr from './attr'

export default {
  name: '单选框组',
  icon: 'radio',
  type: 'basic',
  component: Radio,
  order: 3.5,
  initialValues: {
    label: '单选框组',
    component: 'Radio',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      labelKey: 'label',
      valueKey: 'value',
      optionType: 'circle',
      direction: 'horizontal',
      space: 20
    }
  },
  attr
}
