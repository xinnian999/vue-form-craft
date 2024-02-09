import { linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  { label: '初始值', component: 'Textarea', name: 'initialValue' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [...props]
  },
  ...linkageAttr
]
