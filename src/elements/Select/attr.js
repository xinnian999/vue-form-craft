import { optionAttr, linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  {
    component: 'itemGroup',
    name: 'props',
    children: [
      ...props,
      {
        label: '是否禁用',
        component: 'Switch',
        name: 'disabled',
        onlyId: 'form-kJ7K'
      },
      {
        label: '占位提示',
        component: 'Input',
        name: 'placeholder',
        initialValue: '请选择...',
        onlyId: 'form-ekRL'
      },
      {
        label: '选择模式',
        component: 'Switch',
        name: 'multiple',
        props: {
          'active-text': '多选',
          'inactive-text': '单选'
        },
        onlyId: 'form-eTxc'
      },
      {
        label: '自动选中第一项',
        component: 'Switch',
        name: 'autoSelectedFirst',
        onlyId: 'form-LPpx'
      },
      {
        label: '表格模式',
        component: 'Switch',
        name: 'tableDrop',
        onlyId: 'form-LPpx'
      },
      {
        label: '表格列配置',
        name: 'columns',
        component: 'jsonEdit',
        hidden: '{{!$values.props.tableDrop}}',
        onlyId: 'form-Iwpd',
        initialValue: [
          { title: 'label', dataIndex: 'label' },
          { title: 'value', dataIndex: 'value' }
        ]
      },

      ...optionAttr
    ],
    onlyId: 'form-qYXT'
  },
  ...linkageAttr
]
