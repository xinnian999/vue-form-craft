import basic from './commonAttr/basic'
import linkageAttr from './commonAttr/linkageAttr'

export default {
  name: '单行文本',
  initialValues: { label: '单行文本', component: 'input', props: {} },
  attr: [
    ...basic,
    { label: '初始值', component: 'input', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        { label: '是否禁用', component: 'switch', name: 'disabled' },
        {
          label: '占位提示',
          component: 'input',
          name: 'placeholder',
          initialValue: '请输入...'
        }
      ]
    },
    ...linkageAttr
  ]
}
