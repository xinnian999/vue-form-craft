import { linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  { label: '初始值', component: 'Input', name: 'initialValue' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      ...props,
      {
        label: '占位提示',
        component: 'Input',
        name: 'placeholder',
        initialValue: '请输入...'
      },
      {
        label: '最长字数',
        component: 'InputNumber',
        name: 'maxlength'
      },
      {
        component: 'ItemGroup',
        name: 'autosize',
        children: [
          {
            label: '最小行数',
            component: 'InputNumber',
            name: 'minRows',
            initialValue: 2
          },
          {
            label: '最大行数',
            component: 'InputNumber',
            name: 'maxRows',
            initialValue: 999
          }
        ]
      }
    ]
  },

  ...linkageAttr
]
