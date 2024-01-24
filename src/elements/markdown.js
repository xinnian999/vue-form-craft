import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'
import props from './commonAttr/props'
import { MdEditor } from 'md-editor-v3'

export default {
  name: 'markdown',
  component: MdEditor,
  initialValues: { label: 'markdown编辑器', component: 'markdown' },
  attr: [
    ...basic,
    { label: '初始值', component: 'Textarea', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [...props]
    },
    ...linkageAttr
  ]
}
