import Switch from './Switch.vue'
import attr from './attr'

export default {
  name: '开关',
  component: Switch,
  icon: 'switch',
  type: 'basic',
  order: 8,
  initialValues: { label: '开关', component: 'Switch' },
  attr
}
