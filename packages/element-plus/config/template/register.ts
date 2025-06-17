import type { FormSchema } from '@/types/index'

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
        placeholder: '请输入用户名'
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
      required: true,
      rules: [
        {
          type: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
          message: '密码安全系数低！请不少于8位，且由字母+数字组成！',
          trigger: ['blur']
        }
      ]
    },
    {
      label: '确认密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      designKey: 'form-vHBU',
      name: 'confirmPassword',
      required: true,
      rules: [
        {
          type: 'template',
          templateExp: '{{ $values.password ===  $values.confirmPassword }}',
          message: '两次密码不一致！',
          trigger: ['blur']
        }
      ]
    },
    {
      label: '邮箱',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      designKey: 'form-qx0M',
      name: 'email',
      required: true,
      rules: [
        {
          type: 'email',
          message: '请输入正确的邮箱！',
          trigger: ['blur']
        }
      ]
    },
    {
      label: '验证码',
      component: 'VerifyCode',
      required: true,
      props: {
        placeholder: '请输入验证码'
      },
      designKey: 'design-cb2O',
      name: 'code'
    }
  ]
} satisfies FormSchema
