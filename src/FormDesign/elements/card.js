export default {
  name: '卡片',
  initialValues: {
    label: '卡片',
    component: 'card',
    children: []
  },
  attr: [
    { label: '卡片标题', component: 'input', name: 'label' },
    { label: '字段标识', component: 'input', name: 'name' }
  ]
}
