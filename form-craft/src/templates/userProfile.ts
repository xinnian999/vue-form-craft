import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '姓名',
      name: 'name',
      component: 'Input',
      props: { placeholder: '请输入姓名' },
      required: true,
    },
    {
      label: '性别',
      name: 'gender',
      component: 'Radio',
      props: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ],
        labelKey: 'label',
        valueKey: 'value',
        mode: 'static'
      },
      required: true,
    },
    {
      label: '生日',
      name: 'birthday',
      component: 'DatePicker',
      props: {
        type: 'date',
        placeholder: '请选择生日'
      },
    },
    {
      label: '邮箱',
      name: 'email',
      component: 'Input',
      props: { placeholder: '请输入邮箱' },
      rules: [
        {
          expr: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/',
          message: '请输入有效的邮箱',
          trigger: 'blur'
        }
      ],
    },
    {
      label: '手机号',
      name: 'phone',
      component: 'Input',
      props: { placeholder: '请输入手机号', maxlength: 11 },
      rules: [
        { expr: '/^1[3-9]\\d{9}$/', message: '请输入有效的手机号', trigger: 'blur' }
      ],
    }
  ]
} satisfies FormSchema
