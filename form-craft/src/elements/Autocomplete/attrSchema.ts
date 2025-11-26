import { optionConfig } from '@/config'
import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: '自动完成',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      placeholder: '请选择...'
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
      label: '最长字数',
      component: 'InputNumber',
      name: 'props.maxlength'
    },
    ...optionConfig
  ]
} satisfies FormSchema
