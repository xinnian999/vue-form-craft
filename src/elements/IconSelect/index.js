import IconSelect from './IconSelect.vue'
import attr from './attr'

export default {
  name: '图标选择器',
  icon: 'icon',
  type: 'basic',
  component: IconSelect,
  order: 14,
  initialValues: {
    label: '图标选择器',
    component: 'IconSelect',
    props: {}
  },
  attr
}
