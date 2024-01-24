import attr from './attr'
import InputNumber from './InputNumber.vue'

export default {
  name: '计数器',
  icon: 'inputNumber',
  type: 'basic',
  order: 5,
  component: InputNumber,
  initialValues: { label: '计数器', component: 'InputNumber' },
  attr
}
