import attr from './attr'
import RichText from './RichText.vue'

export default {
  name: '富文本编辑器',
  component: RichText,
  icon: 'rich',
  type: 'basic',
  order: 11.5,
  initialValues: { label: '富文本编辑器', component: 'RichText' },
  attr
}
