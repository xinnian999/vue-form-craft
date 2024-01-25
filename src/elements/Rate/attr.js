import { linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      ...props,
      { label: '是否禁用', component: 'Switch', name: 'disabled' },
      { label: '最大分值', component: 'InputNumber', name: 'max', initialValue: 5 },
      { label: '是否允许半选', component: 'Switch', name: 'allow-half' }
    ]
  },
  ...linkageAttr
]
