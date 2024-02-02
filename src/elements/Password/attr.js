import { linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  { label: '初始值', component: 'Input', name: 'initialValue' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [...props, { label: '显示清除按钮', component: 'Switch', name: 'clearable' }]
  },

  ...linkageAttr
]
