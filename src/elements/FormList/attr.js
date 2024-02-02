import { basic, props } from '../commonAttr'

export default [
  ...basic,
  {
    label: '初始值',
    component: 'JsonEdit',
    name: 'initialValue'
  },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      {
        label: '显示模式',
        component: 'Radio',
        name: 'mode',
        props: {
          mode: 'static',
          options: [
            { label: '表格', value: 'table' },
            { label: '卡片', value: 'card' },
            { label: '行内', value: 'inline' }
          ]
        },
        initialValue: 'table'
      }
    ]
  }
]
