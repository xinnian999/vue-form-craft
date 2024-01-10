import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'
import props from './commonAttr/props'

export default {
  name: '密码输入框',
  initialValues: { label: '密码输入框', component: 'password', props: {} },
  attr: [
    ...basic,
    { label: '初始值', component: 'input', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        ...props,
        { label: '是否禁用', component: 'switch', name: 'disabled' },
        { label: '显示清除按钮', component: 'switch', name: 'clearable' },
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
