import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(['props.readonly', 'props.placeholder', 'initialValue']),
    { label: '初始值', component: 'Textarea', name: 'initialValue' }
  ],
  high: highAttr(),

  linkage: linkageAttr
})
