import type { FormSchema } from '@/types'
import { validationRulesSchema } from '@/config/validationRulesSchema'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: '密码输入框',
    props: {
      placeholder: '请输入密码',
      autocomplete: 'new-password'
    }
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
      label: '占位提示',
      component: 'Input',
      name: 'props.placeholder',
    },
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
      name: 'cNmCuu'
    },
    { label: '显示清除按钮', component: 'Switch', name: 'props.clearable' },
    {
      label: '浏览器自动填充', component: 'Switch', name: 'props.autocomplete', props: {
        activeValue: 'on',
        inactiveValue: 'new-password'
      }
    },
    ...validationRulesSchema
  ]
} satisfies FormSchema
