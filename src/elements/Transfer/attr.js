import { basicAttr, linkageAttr, optionAttr, highAttr } from '../commonAttr'

export default [
  ...basicAttr(['props.readonly', 'props.placeholder']),
  ...optionAttr,
  ...highAttr(),
  {
    label: '开启搜索',
    component: 'Switch',
    name: 'props.filterable',
    onlyId: 'form-ekRL12'
  },
  {
    label: '搜索占位符',
    component: 'Input',
    name: 'props.filter-placeholder',
    onlyId: 'form-ekRL123',
    initialValue: '请输入搜索关键词',
    hidden: '{{!$values.props.filterable}}'
  },
  {
    label: '左列表标题',
    component: 'Input',
    props: {
      autocomplete: 'off',
      showWordLimit: true,
      type: 'text',
      placeholder: '请输入文本',
      style: {}
    },
    onlyId: 'form-7KcJ',
    name: 'props.titles.0'
  },
  {
    label: '右列表标题',
    component: 'Input',
    props: {
      autocomplete: 'off',
      showWordLimit: true,
      type: 'text',
      placeholder: '请输入文本',
      style: {}
    },
    onlyId: 'form-Cp1y',
    name: 'props.titles.1'
  },
  ...linkageAttr
]
