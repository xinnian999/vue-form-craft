import { basic, props } from '../commonAttr'

export default [
  {
    component: 'Alert',
    props: {
      title: '说明',
      type: 'info',
      effect: 'light',
      description: '值是一个【包含多个对象的数组】，适用于收集多组数据',
      closable: true,
      'show-icon': true
    },
    onlyId: 'form-fVKS',
    name: 'sv1sIQ',
    hideLabel: true,
    hidden: false
  },
  ...basic,
  {
    label: '初始值',
    component: 'JsonEdit',
    name: 'initialValue'
  },
  {
    label: '显示模式',
    component: 'Radio',
    name: 'props.mode',
    props: {
      mode: 'static',
      options: [
        { label: '表格', value: 'table' },
        { label: '卡片', value: 'card' },
        { label: '行内', value: 'inline' }
      ]
    },
    initialValue: 'table'
  }
]
