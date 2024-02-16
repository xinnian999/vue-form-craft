export default [
  {
    component: 'Divider',
    props: {
      title: '通用属性',
      contentPosition: 'center'
    },
    onlyId: 'form-Z2QZ',
    name: 'VekeRi'
  },
  { label: '字段标签', component: 'Input', name: 'label' },
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      {
        component: 'Divider',
        props: {
          title: 'Props',
          contentPosition: 'center'
        },
        onlyId: 'form-Props',
        name: 'VekeRi'
      },
      { label: '上传Key', component: 'Input', name: 'uploadKey' },
      { label: '上传地址', component: 'Input', name: 'action' },
      { label: '上传大小限制', component: 'InputNumber', name: 'size', props: { unit: 'MB' } },
      { label: '上传数量限制', component: 'InputNumber', name: 'limit', props: { unit: '个' } },
      {
        label: '按钮文案',
        component: 'Input',
        name: 'buttonText'
      },
      { label: '显示上传列表', component: 'Switch', name: 'showFileList' }
      // {
      //   label: '回显路径',
      //   component: 'Input',
      //   name: 'dataPath',
      //   help: '用于表单回显时，此路径 + 图片名称（此字段的值）组成回显图片路径'
      // }
    ]
  }
]
