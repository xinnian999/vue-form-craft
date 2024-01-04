import linkageAttr from './common/linkageAttr'
import basic from './common/basic'

export default {
  items: [
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
