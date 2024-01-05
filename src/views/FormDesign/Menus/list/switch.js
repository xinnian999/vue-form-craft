import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'

export default {
  name: '开关',
  initialValues: { label: '开关', component: 'switch' },
  attr: [
    ...basic,
    {
      label: '初始值',
      component: 'switch',
      name: 'initialValue'
    },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        { label: '是否禁用', component: 'switch', name: 'disabled' },
        { label: '打开时描述', component: 'input', name: 'active-text' },
        { label: '关闭时描述', component: 'input', name: 'inactive-text' },
        {
          label: '描述显示位置',
          component: 'radio',
          name: 'inline-prompt',
          props: {
            mode: 'static',
            options: [
              { label: '外部', value: 0 },
              { label: '内部', value: 1 }
            ]
          },
          initialValue: 0
        }
      ]
    },
    ...linkageAttr
  ]
}
