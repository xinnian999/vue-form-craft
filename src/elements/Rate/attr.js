import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(['props.readonly', 'props.placeholder', 'initialValue']),
    { label: '初始值', component: 'InputNumber', name: 'initialValue' },

    { label: '最大分值', component: 'InputNumber', name: 'props.max', initialValue: 5 },
    { label: '是否允许半选', component: 'Switch', name: 'props.allow-half' }
  ],
  high: highAttr(),

  linkage: linkageAttr
})
