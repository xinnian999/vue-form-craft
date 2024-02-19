const basicAttr = (omit = []) => {
  const attr = [
    {
      component: 'Title',
      props: {
        title: '常用属性',
        type: 'h4',
        italic: true
      },
      onlyId: 'id-RjVN',
      name: 'form-Kanq'
    },
    { label: '字段标签', component: 'Input', name: 'label' },
    { label: '字段标识', component: 'Input', name: 'name' },
    { label: '字段说明', component: 'Textarea', name: 'help' },
    {
      label: '占位提示',
      component: 'Input',
      name: 'props.placeholder',
      onlyId: 'form-ekRL'
    },
    { label: '初始值', component: 'Input', name: 'initialValue' },
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
      onlyId: 'form-R003',
      name: 'cNmCuu',
      style: {
        marginBottom: 0
      }
    }
  ]

  return attr.filter((item) => !omit.includes(item.name))
}

export default basicAttr
