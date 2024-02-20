import { linkageAttr, basicAttr, highAttr } from '../commonAttr'

export default [
  ...basicAttr(['props.readonly', 'props.placeholder', 'initialValue']),
  { label: '初始值', component: 'InputNumber', name: 'initialValue' },

  { label: '最大分值', component: 'InputNumber', name: 'props.max', initialValue: 5 },
  { label: '是否允许半选', component: 'Switch', name: 'props.allow-half' },

  ...highAttr(),
  ...linkageAttr
]
