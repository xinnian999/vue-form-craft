import { ElSlider } from 'element-plus'
import { linkageAttr, basicAttr, highAttr, mergeAttr } from '@/config/commonAttr'

export default {
  name: '滑块',
  component: ElSlider,
  icon: 'slider',
  type: 'basic',
  order: 12,
  initialValues: { label: '滑块', component: 'Slider' },
  attr: mergeAttr({
    basic: [
      ...basicAttr(['initialValue', 'props.readonly', 'props.placeholder']),
      { label: '初始值', component: 'InputNumber', name: 'initialValue' },
      { label: '开启选择范围', component: 'Switch', name: 'props.range' },
      { label: '步长', component: 'InputNumber', name: 'props.step', initialValue: 1 },
      { label: '最小值', component: 'InputNumber', name: 'props.min', initialValue: 0 },
      { label: '最大值', component: 'InputNumber', name: 'props.max', initialValue: 100 }
    ],
    high: highAttr(),

    linkage: linkageAttr
  })
}
