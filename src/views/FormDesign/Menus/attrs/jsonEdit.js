import linkageAttr from './common/linkageAttr'

export default {
  items: [
    { label: '字段label', component: 'input', name: 'label' },
    { label: '字段标识', component: 'input', name: 'name' },
    { label: '字段说明', component: 'textarea', name: 'help' },
    { label: '初始值', component: 'jsonEdit', name: 'initialValue' },

    ...linkageAttr
  ]
}
