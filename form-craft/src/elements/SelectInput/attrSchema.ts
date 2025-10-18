import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: '选择框+输入框',
    props: {
      placeholder: '请输入文本',
      selectPosition: 'append',
      selectWidth: 70
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
      name: 'cNmCuu',

    },
    {
      label: '文本校验规则',
      component: 'FormList',
      name: 'rules',
      dialog: true,
      children: [
        {
          label: '类型',
          component: 'Select',
          props: {
            mode: 'static',
            options: [
              {
                label: '邮箱',
                value: 'email'
              },
              {
                label: '字母+数字',
                value: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]+$'
              },
              {
                label: '手机号码',
                value: '^1[3456789]\\d{9}$'
              },
              {
                label: '网址',
                value: 'url'
              },
              {
                label: '自定义正则',
                value: 'custom'
              }
            ],
            placeholder: '请选择...',
            labelKey: 'label',
            valueKey: 'value'
          },
          name: 'type'
        },
        {
          label: '自定义正则',
          component: 'Input',
          props: {
            placeholder: '请输入正则表达式'
          },
          name: 'customReg',
          hidden: '{{$item.type!=="custom"}}'
        },
        {
          label: '提示语',
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
    },
    { label: '显示清除按钮', component: 'Switch', name: 'props.clearable' },
    {
      label: '最长字数',
      component: 'InputNumber',
      name: 'props.maxlength'
    },
    {
      label: '选择框位置',
      component: 'Radio',
      name: 'props.selectPosition',
      props: {
        mode: 'static',
        options: [
          { label: '前置', value: 'prepend' },
          { label: '后置', value: 'append' }
        ]
      }
    },
    {
      label: '选择框宽度(px)',
      component: 'InputNumber',
      name: 'props.selectWidth'
    },
    {
      label: '选择框默认值',
      component: 'Input',
      name: 'props.selectInitialValue'
    },
    {
      label: '选项',
      name: 'props.options',
      component: 'FormList',
      dialog: true,
      children: [
        {
          label: '选项名',
          name: 'label',
          component: 'Input',
          props: {
            placeholder: '请输入...'
          },
        },
        {
          label: '选项值',
          name: 'value',
          component: 'Input',
          props: {},
        },
        {
          label: '是否禁用',
          name: 'disabled',
          component: 'Switch',
          props: {},
        }
      ],
      props: {
        mode: 'table'
      }
    }
  ]
} satisfies FormSchema
