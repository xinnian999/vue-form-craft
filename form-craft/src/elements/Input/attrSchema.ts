import { ruleConfig } from '@/config'
import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'left',
  labelWidth: 100,
  initialValues: {
    label: '单行文本',
    props: {
      placeholder: '请输入文本',
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
    { label: '字段说明', component: 'TextArea', name: 'help', designKey: 'form-ekRL1' },
    {
      label: '占位提示',
      component: 'Input',
      name: 'props.placeholder'
    },
    { label: '初始值', component: 'Input', name: 'initialValue' },
    { label: '是否必填', component: 'Switch', name: 'required' },
    { label: '是否只读', component: 'Switch', name: 'props.readonly' },
    { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
    { label: '隐藏字段', component: 'Switch', name: 'hidden' },
    { label: '隐藏标签', component: 'Switch', name: 'hideLabel' },
    { label: '显示清除按钮', component: 'Switch', name: 'props.clearable' },
    {
      label: '浏览器自动填充',
      component: 'Switch',
      name: 'props.autocomplete',
      props: {
        activeValue: 'on',
        inactiveValue: 'new-password'
      }
    },
    {
      label: '最长字数',
      component: 'InputNumber',
      name: 'props.maxlength'
    },
    ...ruleConfig
  ]
} satisfies FormSchema
