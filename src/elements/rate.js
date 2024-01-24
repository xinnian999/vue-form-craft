import basic from './commonAttr/basic'
import props from './commonAttr/props'
import linkageAttr from './commonAttr/linkageAttr'
import { ElRate } from 'element-plus'

export default {
  name: '评分',
  component: ElRate,
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
        { label: '是否禁用', component: 'Switch', name: 'disabled' },
        { label: '最大分值', component: 'InputNumber', name: 'max', initialValue: 5 },
        { label: '是否允许半选', component: 'Switch', name: 'allow-half' }
      ]
    },
    ...linkageAttr
  ]
}
