const basicAttr = (omit = []) => {
  const attr = [
    {
      component: 'Title',
      props: {
        title: '高级属性',
        type: 'h4',
        italic: true
      },
      onlyId: 'id-high-title',
      name: 'form-high-title'
    },
    { label: '自定义class', component: 'Input', name: 'props.class' },
    {
      label: '自定义style',
      component: 'JsonEdit',
      name: 'props.style',
      // initialValue: {},
      help: '与vue的style对象格式一样',
      props: {
        mode: 'dialog'
      }
    }
  ]

  return attr.filter((item) => !omit.includes(item.name))
}

export default basicAttr
