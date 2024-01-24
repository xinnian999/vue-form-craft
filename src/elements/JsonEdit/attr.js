import { linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  { label: '初始值', component: 'JsonEdit', name: 'initialValue' },
  {
    label: 'props',
    component: 'itemGroup',
    name: 'props',
    children: [
      ...props,
      {
        label: '显示模式',
        component: 'Radio',
        name: 'mode',
        props: {
          mode: 'static',
          options: [
            { label: '弹窗', value: 'dialog' },
            { label: '直接显示', value: 'direct' }
          ]
        },
        initialValue: 'dialog'
      }
    ]
  },
  ...linkageAttr
]
