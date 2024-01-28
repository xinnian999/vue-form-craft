export default [
  {
    component: 'Title',
    name: 'basic',
    hideLabel: true,
    props: {
      title: '联动',
      type: 'h4'
    }
  },
  {
    label: '联动表单值',
    name: 'change',
    component: 'FormList',
    help: '本字段值改变时，修改其他字段的值',
    children: [
      {
        label: '目标字段',
        name: 'target',
        component: 'Input',
        props: {}
      },
      {
        label: '值',
        name: 'value',
        component: 'Input',
        props: {}
      }
    ],
    props: {
      mode: 'card'
    }
  }
]
