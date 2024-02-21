import { linkageAttr, basicAttr, highAttr, mergeAttr, apiAttr } from '../commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(['initialValue', 'props.readonly', 'props.placeholder']),
    {
      label: '初始值',
      component: 'Switch',
      name: 'initialValue'
    }
  ],

  high: [
    ...highAttr(),
    { label: '打开时描述', component: 'Input', name: 'props.active-text' },
    { label: '关闭时描述', component: 'Input', name: 'props.inactive-text' },
    {
      label: '描述显示位置',
      component: 'Radio',
      name: 'props.inline-prompt',
      props: {
        mode: 'static',
        options: [
          { label: '外部', value: 0 },
          { label: '内部', value: 1 }
        ]
      },
      initialValue: 0
    }
  ],

  linkage: linkageAttr
})
