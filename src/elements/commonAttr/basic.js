export default [
  {
    component: 'Title',
    name: 'basic',
    hideLabel: true,
    props: {
      title: '通用属性'
    }
  },
  { label: '字段label', component: 'Input', name: 'label' },
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '字段说明', component: 'Textarea', name: 'help' },
  { label: '是否必填', component: 'Switch', name: 'required' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  { label: '隐藏label', component: 'Switch', name: 'hideLabel' }
]
