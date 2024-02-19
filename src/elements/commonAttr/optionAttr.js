import apiAttr from './apiAttr'

export default [
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
    component: 'FormList',
    hidden: '{{$values.props.mode!=="static"}}',
    children: [
      {
        label: '选项名',
        name: '{{$values.props.labelKey}}',
        component: 'Input',
        props: {
          placeholder: '请输入...'
        },
        onlyId: 'form-LnGh'
        // initialValue: "{{ '选项' + ($index+1) }}"
      },
      {
        label: '选项值',
        name: '{{$values.props.valueKey}}',
        component: 'Input',
        props: {},
        onlyId: 'form-HYtW'
        // initialValue: "{{ 'value' + ($index+1) }}"
      }
    ],
    onlyId: 'form-Iwpd',
    props: {
      mode: 'table',
      newItemDefaults:
        '{{ (index) => ({ [$values.props.labelKey]: `选项${index + 1}`, [$values.props.valueKey]: `value${index + 1}` }) }}'
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
  }
]
