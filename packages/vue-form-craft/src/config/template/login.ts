import type { FormSchema } from '@vue-form-craft/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  scrollToError: true,
  items: [
    {
      label: '用户名',
      component: 'Input',
      props: {
        placeholder: '请输入用户名',
        clearable: true
      },
      designKey: 'form-eNR0',
      name: 'username',
      required: true
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      designKey: 'form-D1x7',
      name: 'password',
      required: true
    },
    {
      label: '验证码',
      component: 'VerifyCode',
      required: true,
      props: {
        placeholder: '请输入验证码'
      },
      designKey: 'design-HUBT',
      name: 'code'
    }
  ]
} satisfies FormSchema
