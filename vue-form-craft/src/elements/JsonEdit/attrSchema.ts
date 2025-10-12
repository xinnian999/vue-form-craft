import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: 'JSON编辑器'
  },
  items: [
    { label: '标签', component: 'Input', name: 'label' },
    {
      label: '唯一标识',
      component: 'Input',
      name: 'name',
      help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
    },
    { label: '字段说明', component: 'TextArea', name: 'help' },
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
        'row-gap': 20,
        'column-gap': 20
      },
      designKey: 'form-R003',
      name: 'cNmCuu'
    },
    {
      label: '初始值',
      component: 'JsonEdit',
      name: 'initialValue',
      dialog: true
    }
  ]
} satisfies FormSchema
