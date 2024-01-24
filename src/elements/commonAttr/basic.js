export default [
  {
    component: 'title',
    name: 'basic',
    hideLabel: true,
    props: {
      title: '通用属性'
    }
  },
  { label: '字段label', component: 'input', name: 'label' },
  { label: '字段标识', component: 'input', name: 'name' },
  { label: '字段说明', component: 'textarea', name: 'help' },
  { label: '是否必填', component: 'switch', name: 'required' },
  { label: '隐藏字段', component: 'switch', name: 'hidden' },
  { label: '隐藏label', component: 'switch', name: 'hideLabel' }
]
