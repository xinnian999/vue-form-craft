import { optionAttr, linkageAttr, basicAttr, highAttr, mergeAttr } from '@/config/commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(['initialValue', 'props.readonly']),
    {
      label: '初始值',
      component: 'JsonEdit',
      name: 'initialValue',
      props: {
        mode: 'dialog',
        initVal: '{{$values.props.multiple?[]:" "}}'
      }
    },

    {
      label: '选择模式',
      component: 'Switch',
      name: 'props.multiple',
      props: {
        'active-text': '多选',
        'inactive-text': '单选'
      },
      designKey: 'form-eTxc'
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
    },
    {
      label: '滚动加载下一页',
      component: 'Switch',
      name: 'props.scrollLoad',
      designKey: 'form-LPpxscrollLoad'
    }
  ],

  linkage: linkageAttr
})
