import { optionAttr, basicAttr, highAttr, linkageAttr } from '../commonAttr'

export default [
  ...basicAttr(['initialValue', 'props.readonly', 'props.placeholder']),
  {
    label: '初始值',
    component: 'Input',
    name: 'initialValue'
  },
  ...optionAttr,

  ...highAttr(),
  {
    label: '自动选中第一项',
    component: 'Switch',
    name: 'props.autoSelectedFirst',
    onlyId: 'form-LPpx'
  },
  {
    label: '选项样式类型',
    component: 'Radio',
    name: 'props.optionType',
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
    name: 'props.space',
    props: {
      min: 0
    },
    initialValue: 0
  },

  ...linkageAttr
]
