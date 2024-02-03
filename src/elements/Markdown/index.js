import attr from './attr'
import { MdEditor } from 'md-editor-v3'

export default {
  name: 'markdown',
  component: MdEditor,
  icon: 'markdown',
  type: 'basic',
  order: 11,
  initialValues: { label: 'markdown编辑器', component: 'Markdown' },
  attr
}
