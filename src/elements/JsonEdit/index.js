import JsonEdit from './JsonEdit.vue'
import attr from './attr'

export default {
  name: 'JSON编辑器',
  component: JsonEdit,
  icon: 'jsonEdit',
  type: 'basic',
  order: 14,
  attr,
  initialValues: { label: 'JSON编辑器', component: 'JsonEdit' }
}
