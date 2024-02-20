import { linkageAttr, basicAttr, highAttr } from '../commonAttr'

export default [
  ...basicAttr(['initialValue', 'props.readonly', 'props.placeholder']),
  { label: '初始值', component: 'JsonEdit', name: 'initialValue' },
  {
    label: '显示模式',
    component: 'Radio',
    name: 'props.mode',
    props: {
      mode: 'static',
      options: [
        { label: '直接显示', value: 'direct' },
        { label: '弹窗', value: 'dialog' }
      ]
    }
  },
  ...highAttr(),

  ...linkageAttr
]
