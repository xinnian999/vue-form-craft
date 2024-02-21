export default [
  {
    component: 'Divider',
    props: {
      title: '通用属性',
      contentPosition: 'center'
    },
    designKey: 'form-Z2QZ',
    name: 'VekeRi',
    hidden: false
  },
  { label: '标签', component: 'Input', name: 'label' },
  { label: '唯一标识', component: 'Input', name: 'name' },
  { label: '字段说明', component: 'Textarea', name: 'help' },
  {
    component: 'Grid',
    children: [
      { label: '是否必填', component: 'Switch', name: 'required' },
      { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
      { label: '隐藏字段', component: 'Switch', name: 'hidden' },
      { label: '隐藏label', component: 'Switch', name: 'hideLabel' }
    ],
    props: {
      columns: 3,
      'row-gap': 0,
      'column-gap': 20
    },
    designKey: 'form-R003',
    name: 'cNmCuu'
  },
  { label: '自定义class', component: 'Input', name: 'props.class' },
  {
    label: '自定义style',
    component: 'JsonEdit',
    name: 'props.style',
    initialValue: {},
    help: '与vue的style对象格式一样',
    props: {
      mode: 'dialog'
    }
  }
]
