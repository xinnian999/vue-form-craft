import { linkageAttr, basicAttr, highAttr } from '../commonAttr'

export default [
  ...basicAttr(['props.readonly', 'props.placeholder', 'initialValue']),
  { label: '初始值', component: 'Textarea', name: 'initialValue' },

  ...highAttr(),
  ...linkageAttr
]
