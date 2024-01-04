import linkageAttr from './common/linkageAttr'
import basic from './common/basic'

export default {
  items: [
    ...basic,
    { label: '初始值', component: 'colorPicker', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [{ label: '是否禁用', component: 'switch', name: 'disabled' }]
    },
    ...linkageAttr
  ]
}
