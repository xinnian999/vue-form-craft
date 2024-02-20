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
  { label: '图片宽度', component: 'InputNumber', name: 'props.width', props: { unit: 'px' } },
  { label: '图片高度', component: 'InputNumber', name: 'props.height', props: { unit: 'px' } },
  {
    label: '允许图片格式',
    component: 'Checkbox',
    name: 'props.fileTypes',
    props: {
      mode: 'static',
      options: [
        { label: 'JPG', value: 'jpeg' },
        { label: 'PNG', value: 'png' },
        { label: 'WebP', value: 'webp' },
        { label: 'SVG', value: 'svg+xml' }
      ]
    }
  },
  { label: '上传大小限制', component: 'InputNumber', name: 'props.size', props: { unit: 'MB' } },
  {
    label: '数据路径',
    component: 'Input',
    name: 'props.dataPath',
    help: '用于上传成功后，可以在回参里取一个值保存到字段值。(比如图片存储在服务器的地址)'
  },
  ...highAttr()
]
