export default [
  { label: '字段label', component: 'Input', name: 'label' },
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      { label: '上传Key', component: 'Input', name: 'uploadKey' },
      { label: '上传地址', component: 'Input', name: 'action' },
      { label: '图片宽度', component: 'InputNumber', name: 'width', props: { unit: 'px' } },
      { label: '图片高度', component: 'InputNumber', name: 'height', props: { unit: 'px' } },
      {
        label: '允许图片格式',
        component: 'Checkbox',
        name: 'fileTypes',
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
      { label: '上传大小限制', component: 'InputNumber', name: 'size', props: { unit: 'MB' } },
      {
        label: '数据路径',
        component: 'Input',
        name: 'dataPath',
        help: '用于上传成功后，可以在回参里取一个值保存到字段值。(比如图片存储在服务器的地址)'
      }
      // {
      //   label: '回显路径',
      //   component: 'Input',
      //   name: 'dataPath',
      //   help: '用于表单回显时，此路径 + 图片名称（此字段的值）组成回显图片路径'
      // }
    ]
  }
]