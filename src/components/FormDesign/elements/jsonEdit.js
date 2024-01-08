import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'
export default {
  name: 'JSON编辑器',
  initialValues: { label: 'JSON编辑器', component: 'jsonEdit' },
  attr: [
    ...basic,
    { label: '初始值', component: 'jsonEdit', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        {
          label: '显示模式',
          component: 'radio',
          name: 'mode',
          props: {
            mode: 'static',
            options: [
              { label: '弹窗', value: 'dialog' },
              { label: '直接显示', value: 'direct' }
            ]
          },
          initialValue: 'dialog'
        }
      ]
    },
    ...linkageAttr
  ]
}
