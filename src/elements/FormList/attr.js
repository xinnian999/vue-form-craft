import { basicAttr, highAttr } from '../commonAttr'

export default [
  {
    component: 'Alert',
    props: {
      title: '说明',
      type: 'info',
      effect: 'light',
      description: '值是由【多个相同格式的对象】组成的数组，适用于收集多组数据',
      closable: true,
      'show-icon': true
    },
    onlyId: 'form-fVKS',
    name: 'sv1sIQ',
    hideLabel: true,
    hidden: false
  },
  ...basicAttr(['initialValue', 'props.placeholder']),

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
    }
  },
  {
    label: '初始值',
    component: 'JsonEdit',
    name: 'initialValue',
    props: {
      mode: 'dialog',
      initVal: []
    }
  },

  ...highAttr()
]
