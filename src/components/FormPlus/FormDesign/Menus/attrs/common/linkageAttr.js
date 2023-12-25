export default [
  { label: '隐藏条件', component: 'input', name: 'hidden' },
  {
    label: '联动值',
    name: 'linkage',
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
