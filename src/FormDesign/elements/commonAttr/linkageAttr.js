export default [
  {
    label: '联动值',
    name: 'change',
    component: 'formList',
    children: [
      {
        label: '联动字段',
        name: 'target',
        component: 'input',
        props: {}
      },
      {
        label: '值',
        name: 'value',
        component: 'input',
        props: {}
      }
    ],
    props: {
      mode: 'card'
    }
  }
]
