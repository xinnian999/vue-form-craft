import basic from './commonAttr/basic'
import props from './commonAttr/props'
import linkageAttr from './commonAttr/linkageAttr'

export default {
  name: '评分',
  initialValues: {
    label: '评分',
    component: 'rate',
    props: {}
  },
  attr: [
    ...basic,
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        ...props,
        { label: '是否禁用', component: 'switch', name: 'disabled' },
        { label: '最大分值', component: 'inputNumber', name: 'max', initialValue: 5 },
        { label: '是否允许半选', component: 'switch', name: 'allow-half' }
      ]
    },
    ...linkageAttr
  ]
}
