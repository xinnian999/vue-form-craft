import { basicAttr, highAttr } from '../commonAttr'

export default [
  ...basicAttr([
    'initialValue',
    'props.readonly',
    'props.placeholder',
    'required',
    'props.disabled'
  ]),
  { label: '上传Key', component: 'Input', name: 'props.uploadKey' },
  { label: '上传地址', component: 'Input', name: 'props.action' },
  { label: '上传大小限制', component: 'InputNumber', name: 'props.size', props: { unit: 'MB' } },
  { label: '上传数量限制', component: 'InputNumber', name: 'props.limit', props: { unit: '个' } },
  {
    label: '按钮文案',
    component: 'Input',
    name: 'props.buttonText'
  },
  { label: '显示上传列表', component: 'Switch', name: 'props.showFileList' },
  ...highAttr()
]
