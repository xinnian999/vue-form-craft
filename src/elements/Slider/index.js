import { ElSlider } from 'element-plus'
import { linkageAttr, basic, props } from '../commonAttr'

export default {
  name: '滑块',
  component: ElSlider,
  icon: 'slider',
  type: 'basic',
  order: 12,
  initialValues: { label: '滑块', component: 'Slider' },
  attr: [
    ...basic,
    { label: '初始值', component: 'InputNumber', name: 'initialValue' },
    {
      label: 'props',
      component: 'ItemGroup',
      name: 'props',
      children: [
        ...props,
        { label: '开启选择范围', component: 'Switch', name: 'range' },
        { label: '步长', component: 'InputNumber', name: 'step', initialValue: 1 },
        { label: '最小值', component: 'InputNumber', name: 'min', initialValue: 0 },
        { label: '最大值', component: 'InputNumber', name: 'max', initialValue: 100 }
      ]
    },
    ...linkageAttr
  ]
}
