export default [
  {
    component: 'Title',
    props: {
      title: '联动',
      type: 'h4',
      italic: true
    },
    onlyId: 'id-high-linkage',
    name: 'form-high-linkage',
    style: {
      marginTop: '40px'
    }
  },
  {
    label: '本字段值改变时，修改其他字段的值',
    name: 'change',
    component: 'FormList',
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
