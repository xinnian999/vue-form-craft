import basic from './common/basic'
export default [
  ...basic,
  {
    label: '初始值',
    component: 'jsonEdit',
    name: 'initialValue'
  },
  {
    label: 'props',
    component: 'itemGroup',
    name: 'props',
    children: [
      {
        label: '显示模式',
        component: 'radio',
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
