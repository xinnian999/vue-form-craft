import { linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  {
    label: '初始值',
    component: 'InputNumber',
    name: 'initialValue'
  },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      ...props,
      {
        label: '按钮位置',
        component: 'Radio',
        name: 'controlsPosition',
        props: {
          mode: 'static',
          options: [
            { label: '两侧', value: '' },
            { label: '内部', value: 'right' }
          ]
        },
        initialValue: ''
      },
      {
        label: '最小值',
        component: 'InputNumber',
        name: 'min',
        initialValue: 1
      },
      {
        label: '最大值',
        component: 'InputNumber',
        name: 'max',
        initialValue: 9999
      },
      {
        label: '单位',
        component: 'Input',
        name: 'unit'
      },
      {
        label: '步长',
        component: 'InputNumber',
        name: 'step',
        initialValue: 1
      }
    ]
  },
  ...linkageAttr
]
