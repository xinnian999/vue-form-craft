import { apiAttr, linkageAttr, basicAttr, highAttr } from '../commonAttr'

export default [
  ...basicAttr(['initialValue', 'props.readonly']),
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
  {
    label: '初始值',
    component: 'Input',
    name: 'initialValue',
    onlyId: 'form-4MUd'
  },

  {
    component: 'Title',
    props: {
      title: '选项设置',
      type: 'h4',
      italic: true
    },
    onlyId: 'id-options',
    name: 'form-options'
  },
  {
    label: '标签key',
    component: 'Input',
    name: 'props.labelKey',
    onlyId: 'form-X6hs'
  },
  {
    label: '值Key',
    component: 'Input',
    name: 'props.valueKey',
    onlyId: 'form-STkl'
  },
  {
    label: '数据模式',
    component: 'Radio',
    name: 'props.mode',
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
      ],
      optionType: 'button'
    },
    onlyId: 'form-PLpj'
  },
  {
    label: '静态选项',
    name: 'props.options',
    component: 'JsonEdit',
    hidden: '{{$values.props.mode!=="static"}}',
    onlyId: 'form-Iwpd',
    props: {
      mode: 'dialog'
    }
  },
  {
    component: 'Card',
    props: {
      header: '远程数据'
    },
    onlyId: 'id-pGeN',
    name: 'form-6vzT',
    hidden: '{{$values.props.mode==="static"}}',
    children: apiAttr
  },

  ...highAttr(),
  {
    label: '只取最后一级',
    component: 'Switch',
    name: 'props.takeLastLevel',
    onlyId: 'form-kJ7K222',
    hidden: '{{$values.props.multiple}}'
  },

  ...linkageAttr
]
