import { linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  {
    label: '初始值',
    component: 'Switch',
    name: 'initialValue'
  },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      ...props,
      { label: '打开时描述', component: 'Input', name: 'active-text' },
      { label: '关闭时描述', component: 'Input', name: 'inactive-text' },
      {
        label: '描述显示位置',
        component: 'Radio',
        name: 'inline-prompt',
        props: {
          mode: 'static',
          options: [
            { label: '外部', value: 0 },
            { label: '内部', value: 1 }
          ]
        },
        initialValue: 0
      }
    ]
  },
  ...linkageAttr
]
