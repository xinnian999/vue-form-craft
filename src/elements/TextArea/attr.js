import { linkageAttr, basicAttr, highAttr } from '../commonAttr'

export default [
  ...basicAttr(),
  ...highAttr(),
  {
    label: '最长字数',
    component: 'InputNumber',
    name: 'props.maxlength'
  },
  {
    label: '最小行数',
    component: 'InputNumber',
    name: 'props.autosize.minRows',
    initialValue: 2
  },
  {
    label: '最大行数',
    component: 'InputNumber',
    name: 'props.autosize.maxRows',
    initialValue: 999
  },

  ...linkageAttr
]
