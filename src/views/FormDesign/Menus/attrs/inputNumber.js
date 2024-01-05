import linkageAttr from './common/linkageAttr'
import basic from './common/basic'

export default [
  ...basic,
  {
    label: '初始值',
    component: 'inputNumber',
    name: 'initialValue'
  },
  {
    label: 'props',
    component: 'itemGroup',
    name: 'props',
    children: [
      { label: '是否禁用', component: 'switch', name: 'disabled' },
      {
        label: '按钮位置',
        component: 'radio',
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
        component: 'inputNumber',
        name: 'min',
        initialValue: 1
      },
      {
        label: '最大值',
        component: 'inputNumber',
        name: 'max',
        initialValue: 9999
      },
      {
        label: '单位',
        component: 'input',
        name: 'unit'
      },
      {
        label: '步长',
        component: 'inputNumber',
        name: 'step',
        initialValue: 1
      }
    ]
  },
  ...linkageAttr
]
