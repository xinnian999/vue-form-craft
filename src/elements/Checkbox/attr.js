import { optionAttr, linkageAttr, basicAttr, highAttr, mergeAttr } from '../commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(['props.readonly', 'props.placeholder', 'initialValue']),
    {
      label: '初始值',
      component: 'JsonEdit',
      name: 'initialValue',
      props: {
        mode: 'dialog',
        initVal: []
      }
    },

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
      },
      initialValue: 'circle'
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
