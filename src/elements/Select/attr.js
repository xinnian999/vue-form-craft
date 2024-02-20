import { optionAttr, linkageAttr, basicAttr, highAttr } from '../commonAttr'

export default [
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
    onlyId: 'form-eTxc'
  },

  ...optionAttr,

  ...highAttr(),

  {
    label: '自动选中第一项',
    component: 'Switch',
    name: 'props.autoSelectedFirst',
    onlyId: 'form-LPpx'
  },
  {
    label: '滚动加载下一页',
    component: 'Switch',
    name: 'props.scrollLoad',
    onlyId: 'form-LPpxscrollLoad'
  },
  {
    label: '表格模式',
    component: 'Switch',
    name: 'props.tableDrop',
    onlyId: 'form-LPpx',
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
    onlyId: 'form-Iwpd',
    props: {
      mode: 'dialog'
    }
  },

  ...linkageAttr
]
