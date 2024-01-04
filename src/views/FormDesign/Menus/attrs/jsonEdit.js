import linkageAttr from './common/linkageAttr'
import basic from './common/basic'

export default {
  items: [
    ...basic,
    { label: '初始值', component: 'jsonEdit', name: 'initialValue' },
    ...linkageAttr
  ]
}
