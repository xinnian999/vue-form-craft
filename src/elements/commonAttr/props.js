export default [
  {
    component: 'Title',
    name: 'Props',
    hideLabel: true,
    props: {
      title: 'props',
      type: 'h4'
    }
  },
  { label: '自定义class', component: 'Input', name: 'class' },
  { label: '是否禁用', component: 'Switch', name: 'disabled' },
  {
    label: '占位提示',
    component: 'Input',
    name: 'placeholder',
    onlyId: 'form-ekRL'
  }
]
