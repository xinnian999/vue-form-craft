import type { FormSchema } from '@vue-form-craft/core'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  scrollToError: true,
  items: [
    {
      label: '用户名',
      name: 'username',
      component: 'Input',
      props: {
        placeholder: '请输入用户名'
      },
      required: true,
      designKey: 'design-lg-usrn'
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
          expr: '/^.{6,20}$/',
          message: '密码长度必须为6-20位',
          trigger: 'blur'
        }
      ],
      designKey: 'design-lg-pswd'
    },
    {
      label: '记住我',
      name: 'remember',
      component: 'Switch',
      props: {
        'inline-prompt': false
      },
      initialValue: false,
      designKey: 'design-lg-rmb'
    }
  ]
} satisfies FormSchema
