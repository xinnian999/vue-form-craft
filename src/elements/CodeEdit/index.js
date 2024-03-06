import attr from './attr'
import CodeEdit from './CodeEdit.vue'

export default {
  name: '代码编辑器',
  component: CodeEdit,
  icon: 'rich',
  type: 'basic',
  order: 19.5,
  initialValues: { label: '代码编辑器', component: 'CodeEdit' },
  attr
}
