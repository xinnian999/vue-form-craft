import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'
export default {
  name: 'JSON编辑器',
  initialValues: { label: 'JSON编辑器', component: 'jsonEdit' },
  attr: [...basic, { label: '初始值', component: 'jsonEdit', name: 'initialValue' }, ...linkageAttr]
}
