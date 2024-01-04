export default {
  items: [
    { label: '字段label', component: 'input', name: 'label' },
    { label: '字段标识', component: 'input', name: 'name' },
    { label: '隐藏label', component: 'switch', name: 'hideLabel' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [{ label: '按钮名称', component: 'input', name: 'name' }]
    }
  ]
}
