import { ElColorPicker } from 'element-plus'
import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../commonAttr'

export default {
  name: '颜色选择器',
  component: ElColorPicker,
  icon: 'colorPicker',
  type: 'basic',
  order: 9,
  initialValues: {
    label: '颜色选择器',
    component: 'ColorPicker'
  },
  attr: mergeAttr({
    basic: [
      ...basicAttr(['props.readonly', 'props.placeholder']),
      { label: '初始值', component: 'ColorPicker', name: 'initialValue' }
    ],
    high: highAttr(),

    linkage: linkageAttr
  })
}
