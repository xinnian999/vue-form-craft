import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  scrollToError: true,
  submitBtn: true,
  items: [
    {
      label: '用户名',
      name: 'username',
      component: 'Input',
      props: {
        placeholder: '请输入用户名'
      },
      required: true,
    },
    {
      label: '密码',
      name: 'password',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      required: true,
      rules: [
        {
          type: 'pattern',
          value: '^.{6,20}$',
          message: '密码长度必须为6-20位',
          trigger: 'blur'
        }
      ],
    },
    {
      label: '记住我',
      name: 'remember',
      component: 'Switch',
      props: {
        'inline-prompt': false
      },
      initialValue: false,
    }
  ]
} satisfies FormSchema
