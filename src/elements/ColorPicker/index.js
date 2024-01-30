import { ElColorPicker } from 'element-plus'
import { linkageAttr, basic, props } from '../commonAttr'

export default {
  name: '颜色选择器',
  component: ElColorPicker,
  icon: 'colorPicker',
  type: 'basic',
  order: 9,
  initialValues: { label: '颜色选择器', component: 'ColorPicker' },
  attr: [
    ...basic,
    { label: '初始值', component: 'ColorPicker', name: 'initialValue' },
    {
      label: 'props',
      component: 'ItemGroup',
      name: 'props',
      children: [...props]
    },
    ...linkageAttr
  ]
}
