import linkageAttr from './common/linkageAttr'
import basic from './common/basic'

export default [
  ...basic,
  { label: '初始值', component: 'jsonEdit', name: 'initialValue' },
  ...linkageAttr
]
