import type { FormSchema } from '@vue-form-craft/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: { label: '开关', props: { 'inline-prompt': false } },
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
      name: 'cNmCuu',

    },
    {
      label: '初始值',
      component: 'Switch',
      name: 'initialValue'
    },
    { label: '打开时描述', component: 'Input', name: 'props.active-text' },
    { label: '关闭时描述', component: 'Input', name: 'props.inactive-text' },
    {
      label: '描述显示位置',
      component: 'Radio',
      name: 'props.inline-prompt',
      props: {
        mode: 'static',
        options: [
          { label: '外部', value: false },
          { label: '内部', value: true }
        ]
      }
    }
  ]
} satisfies FormSchema
