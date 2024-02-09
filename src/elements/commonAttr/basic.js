export default [
  // {
  //   component: 'Title',
  //   name: 'basic',
  //   hideLabel: true,
  //   props: {
  //     title: '通用属性',
  //     type: 'h4'
  //   }
  // },
  {
    component: 'Divider',
    props: {
      title: '通用属性',
      contentPosition: 'center'
    },
    onlyId: 'form-Z2QZ',
    name: 'VekeRi',
    hidden: false
  },
  { label: '字段标签', component: 'Input', name: 'label' },
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '字段说明', component: 'Textarea', name: 'help' },
  {
    component: 'Grid',
    children: [
      { label: '是否必填', component: 'Switch', name: 'required' },
      { label: '隐藏字段', component: 'Switch', name: 'hidden' },
      { label: '隐藏label', component: 'Switch', name: 'hideLabel' }
    ],
    props: {
      colCount: 3,
      space: 20
    },
    onlyId: 'form-R003',
    name: 'cNmCuu'
  }
]
