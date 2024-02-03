import attr from './attr'
import Transfer from './Transfer.vue'

export default {
  name: '穿梭框',
  icon: 'transfer',
  type: 'basic',
  component: Transfer,
  order: 8,
  initialValues: {
    label: '穿梭框',
    component: 'Transfer',
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
