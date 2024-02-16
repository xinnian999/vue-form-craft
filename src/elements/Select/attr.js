import { optionAttr, linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  {
    label: '初始值',
    component: 'JsonEdit',
    name: 'initialValue',
    props: {
      mode: 'dialog'
    }
  },
  {
    component: 'ItemGroup',
    name: 'props',
    children: [
      ...props,
      {
        label: '选择模式',
        component: 'Switch',
        name: 'multiple',
        props: {
          'active-text': '多选',
          'inactive-text': '单选'
        },
        onlyId: 'form-eTxc',
        change: [{ target: 'initialValue', value: "{{ $val?[]:'' }}" }]
      },
      {
        label: '自动选中第一项',
        component: 'Switch',
        name: 'autoSelectedFirst',
        onlyId: 'form-LPpx'
      },
      {
        label: '滚动加载下一页',
        component: 'Switch',
        name: 'scrollLoad',
        onlyId: 'form-LPpxscrollLoad'
      },
      {
        label: '表格模式',
        component: 'Switch',
        name: 'tableDrop',
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
        name: 'columns',
        component: 'JsonEdit',
        hidden: '{{!$values.props.tableDrop}}',
        onlyId: 'form-Iwpd',
        props: {
          mode: 'dialog'
        }
      },

      ...optionAttr
    ],
    onlyId: 'form-qYXT'
  },
  ...linkageAttr
]
