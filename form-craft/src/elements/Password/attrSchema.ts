import type { FormSchema } from '@/types'

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
    {
      label: '密码校验规则',
      component: 'FormList',
      name: 'rules',
      children: [
        {
          label: '表达式',
          component: 'Autocomplete',
          props: {
            options: [
              {
                label: '不少于8位，由字母+数字组成',
                value: '/^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/'
              },
              {
                label: '不少于8位，且同时包含大小写字母、数字',
                value: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/'
              },
              {
                label: '不少于8位，至少包含大小写字母、数字、特殊符号其中的三种',
                value: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{8,}$/'
              }
            ]
          },
          help: '<pre>可设置为【正则表达式】或【】。\n【正则表达式】应该将\\转义成\\\\。\n【】最终应返回一个布尔值。</pre>',
          name: 'expr'
        },
        {
          label: '校验失败提示语',
          component: 'Input',
          props: {
            placeholder: '请输入...'
          },
          name: 'message'
        },
        {
          label: '校验时机',
          component: 'Checkbox',
          props: {
            mode: 'static',
            options: [
              {
                label: '失去焦点时',
                value: 'blur'
              },
              {
                label: '输入时',
                value: 'change'
              }
            ],
            placeholder: '请选择...',
            labelKey: 'label',
            valueKey: 'value'
          },
          name: 'trigger'
        }
      ],
      props: {
        mode: 'card',
        title: '校验规则'
      }
    }
  ]
} satisfies FormSchema
