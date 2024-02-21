import { optionAttr, linkageAttr, basicAttr, highAttr, mergeAttr } from '../commonAttr'

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
    }
  ],

  option: optionAttr,
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
    },
    {
      label: '表格模式',
      component: 'Switch',
      name: 'props.tableDrop',
      designKey: 'form-LPpx',
      change: [
        {
          target: 'props.columns',
          value: [
            { title: 'label', dataIndex: 'label' },
            { title: 'value', dataIndex: 'value' }
          ]
        }
      ]
    },
    {
      label: '表格列配置',
      name: 'props.columns',
      component: 'JsonEdit',
      hidden: '{{!$values.props.tableDrop}}',
      designKey: 'form-Iwpd',
      props: {
        mode: 'dialog'
      }
    }
  ],

  linkage: linkageAttr
})
