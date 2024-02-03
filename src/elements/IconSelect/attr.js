import { linkageAttr, basic, props } from '../commonAttr'
export default [
  ...basic,
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [...props]
  }
]
