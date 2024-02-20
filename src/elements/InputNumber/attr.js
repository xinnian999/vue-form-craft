import { linkageAttr, basicAttr, highAttr } from '../commonAttr'

export default [
  ...basicAttr(['initialValue']),
  {
    label: '初始值',
    component: 'InputNumber',
    name: 'initialValue'
  },

  {
    label: '按钮位置',
    component: 'Radio',
    name: 'props.controlsPosition',
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
    name: 'props.min',
    initialValue: 1
  },
  {
    label: '最大值',
    component: 'InputNumber',
    name: 'props.max',
    initialValue: 9999
  },
  {
    label: '单位',
    component: 'Input',
    name: 'props.unit'
  },
  {
    label: '步长',
    component: 'InputNumber',
    name: 'props.step',
    initialValue: 1
  },

  ...highAttr(),

  ...linkageAttr
]
