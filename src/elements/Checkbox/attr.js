import { optionAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  // { label: '初始值', component: 'Input', name: 'initialValue' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      ...props,
      { label: '是否禁用', component: 'Switch', name: 'disabled' },
      {
        label: '自动选中第一项',
        component: 'Switch',
        name: 'autoSelectedFirst'
      },
      {
        label: '选项样式类型',
        component: 'Radio',
        name: 'optionType',
        props: {
          mode: 'static',
          options: [
            { label: '无边框', value: 'circle' },
            { label: '边框', value: 'border' },
            { label: '按钮', value: 'button' }
          ]
        },
        initialValue: 'circle'
      },
      {
        label: '选项间距',
        component: 'InputNumber',
        name: 'space',
        props: {
          min: 0
        },
        initialValue: 0
      },
      ...optionAttr
    ]
  }
]
