import linkageAttr from './common/linkageAttr'

export default {
  items: [
    { label: '字段label', component: 'input', name: 'label' },
    { label: '字段标识', component: 'input', name: 'name' },
    { label: '字段说明', component: 'textarea', name: 'help' },
    { label: '初始值', component: 'input', name: 'initialValue' },
    { label: '是否必填', component: 'switch', name: 'required' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [{ label: '是否禁用', component: 'switch', name: 'disabled' }]
    },
    ...linkageAttr
  ]
}
