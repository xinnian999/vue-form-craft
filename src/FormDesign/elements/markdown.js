import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'
import props from './commonAttr/props'
export default {
  name: 'markdown',
  initialValues: { label: 'markdown编辑器', component: 'markdown' },
  attr: [
    ...basic,
    { label: '初始值', component: 'textarea', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [...props]
    },
    ...linkageAttr
  ]
}
