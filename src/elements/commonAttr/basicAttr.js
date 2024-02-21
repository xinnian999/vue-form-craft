import { recursionDelete } from '@/utils'

const basicAttr = (omit = [], moreAttrs = []) => {
  const attr = [
    // {
    //   component: 'Title',
    //   props: {
    //     title: '常见属性',
    //     type: 'h4',
    //     italic: true
    //   },
    //   designKey: 'id-RjVN',
    //   name: 'form-Kanq'
    // },
    { label: '标签', component: 'Input', name: 'label' },
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '字段说明', component: 'Textarea', name: 'help' },
    {
      label: '占位提示',
      component: 'Input',
      name: 'props.placeholder',
      designKey: 'form-ekRL'
    },
    { label: '初始值', component: 'Input', name: 'initialValue' },
    {
      component: 'Grid',
      children: [
        { label: '是否必填', component: 'Switch', name: 'required' },
        { label: '是否只读', component: 'Switch', name: 'props.readonly' },
        { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
        { label: '隐藏字段', component: 'Switch', name: 'hidden' },
        { label: '隐藏标签', component: 'Switch', name: 'hideLabel' }
      ],
      props: {
        columns: 3,
        'row-gap': 0,
        'column-gap': 20
      },
      designKey: 'form-R003',
      name: 'cNmCuu',
      style: {
        marginBottom: 0
      }
    }
  ]

  const omitAttrs = recursionDelete(attr, (item) => !omit.includes(item.name))

  return [...omitAttrs, ...moreAttrs]
}

export default basicAttr
