import { basicAttr, highAttr, mergeAttr } from '../commonAttr'

export default mergeAttr({
  basic: [
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
      designKey: 'form-fVKS',
      name: 'sv1sIQ',
      hidden: false
    },
    ...basicAttr(['initialValue', 'props.placeholder', 'props.readonly']),

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
      label: '卡片标题',
      component: 'Input',
      name: 'props.title',
      hidden: "{{$values.props.mode!=='card'}}"
    },
    {
      label: '初始值',
      component: 'JsonEdit',
      name: 'initialValue',
      props: {
        mode: 'dialog',
        initVal: []
      }
    }
  ],
  high: highAttr()
})
