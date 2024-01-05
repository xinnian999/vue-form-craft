import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'

export default {
  name: '多行文本',
  initialValues: {
    label: '多行文本',
    component: 'textarea',
    props: {
      autosize: { minRows: 4, maxRows: 999 }
    }
  },
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
        },
        {
          component: 'itemGroup',
          name: 'autosize',
          children: [
            {
              label: '最小行数',
              component: 'inputNumber',
              name: 'minRows',
              initialValue: 2
            },
            {
              label: '最大行数',
              component: 'inputNumber',
              name: 'maxRows',
              initialValue: 999
            }
          ]
        }
      ]
    },

    ...linkageAttr
  ]
}
