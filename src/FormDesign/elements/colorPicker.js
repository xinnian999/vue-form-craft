import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'
import props from './commonAttr/props'
export default {
  name: '颜色选择器',
  initialValues: { label: '颜色选择器', component: 'colorPicker' },
  attr: [
    ...basic,
    { label: '初始值', component: 'colorPicker', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [...props, { label: '是否禁用', component: 'switch', name: 'disabled' }]
    },
    ...linkageAttr
  ]
}
