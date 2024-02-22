import { optionAttr, linkageAttr, basicAttr, highAttr, mergeAttr } from '../commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(['props.readonly', 'props.placeholder']),
    {
      label: '选项样式类型',
      component: 'Radio',
      name: 'props.optionType',
      props: {
        mode: 'static',
        options: [
          { label: '无边框', value: 'circle' },
          { label: '边框', value: 'border' },
          { label: '按钮', value: 'button' }
        ]
      }
    },
    {
      label: '选项排列方向',
      component: 'Radio',
      name: 'props.direction',
      props: {
        mode: 'static',
        options: [
          { label: '水平排列', value: 'horizontal' },
          { label: '垂直排列', value: 'vertical' }
        ]
      }
    },
    {
      label: '选项间距',
      component: 'InputNumber',
      name: 'props.space'
    },
    ...optionAttr
  ],

  high: [
    ...highAttr(),
    {
      label: '自动选中第一项',
      component: 'Switch',
      name: 'props.autoSelectedFirst',
      designKey: 'form-LPpx'
    }
  ],

  linkage: linkageAttr
})
