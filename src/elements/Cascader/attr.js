import { apiAttr, linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  {
    label: '初始值',
    component: 'Input',
    name: 'initialValue',
    onlyId: 'form-4MUd'
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
        onlyId: 'form-eTxc'
      },

      {
        label: '只取最后一级',
        component: 'Switch',
        name: 'takeLastLevel',
        onlyId: 'form-kJ7K222',
        hidden: '{{$values.props.multiple}}'
      },
      {
        label: '标签key',
        component: 'Input',
        name: 'labelKey',
        initialValue: 'label',
        onlyId: 'form-X6hs'
      },
      {
        label: '值Key',
        component: 'Input',
        name: 'valueKey',
        initialValue: 'value',
        onlyId: 'form-STkl'
      },
      {
        label: '数据模式',
        component: 'Radio',
        name: 'mode',
        props: {
          mode: 'static',
          options: [
            {
              label: '静态',
              value: 'static'
            },
            {
              label: '远程',
              value: 'remote'
            }
          ]
        },
        initialValue: 'static',
        onlyId: 'form-PLpj'
      },
      {
        label: '静态选项',
        name: 'options',
        component: 'JsonEdit',
        hidden: '{{$values.props.mode!=="static"}}',
        onlyId: 'form-Iwpd'
      },
      apiAttr
    ],
    onlyId: 'form-qYXT'
  },
  ...linkageAttr
]
