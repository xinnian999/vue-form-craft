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
      { label: '是否禁用', component: 'Switch', name: 'disabled' },
      { label: '显示清除按钮', component: 'Switch', name: 'clearable' },
      {
        label: '占位提示',
        component: 'Input',
        name: 'placeholder',
        initialValue: '请输入...'
      }
    ]
  },

  ...linkageAttr
]
