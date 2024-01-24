import apiAttr from './apiAttr'

export default [
  {
    label: '标签key',
    component: 'input',
    name: 'labelKey',
    initialValue: 'label',
    onlyId: 'form-X6hs'
  },
  {
    label: '值Key',
    component: 'input',
    name: 'valueKey',
    initialValue: 'value',
    onlyId: 'form-STkl'
  },
  {
    label: '数据模式',
    component: 'radio',
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
    component: 'formList',
    hidden: '{{$values.props.mode!=="static"}}',
    children: [
      {
        label: '选项名',
        name: '{{$values.props.labelKey}}',
        component: 'input',
        props: {
          placeholder: '请输入...'
        },
        onlyId: 'form-LnGh'
      },
      {
        label: '选项值',
        name: '{{$values.props.valueKey}}',
        component: 'input',
        props: {},
        onlyId: 'form-HYtW'
      }
    ],
    onlyId: 'form-Iwpd',
    props: {
      mode: 'table',
      newItemDefaults: (index) => ({ label: `选项${index + 1}`, value: `value${index + 1}` })
    }
  },
  apiAttr
]
