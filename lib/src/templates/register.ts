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
      rules: [
        {
          type: 'required',
          message: '请输入用户名',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '密码',
      name: 'password',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      rules: [
        {
          type: 'required',
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          type: 'min',
          value: 8,
          message: '密码长度至少8位',
          trigger: 'blur'
        },
        {
          type: 'max',
          value: 20,
          message: '密码长度最多20位',
          trigger: 'blur'
        },
        {
          type: 'pattern',
          value: '(?=.*[a-z])',
          message: '密码必须包含小写字母',
          trigger: 'blur'
        },
        {
          type: 'pattern',
          value: '(?=.*[A-Z])',
          message: '密码必须包含大写字母',
          trigger: 'blur'
        },
        {
          type: 'pattern',
          value: '(?=.*\\d)',
          message: '密码必须包含数字',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '确认密码',
      props: {
        placeholder: '请再次输入密码'
      },
      name: 'confirmPassword',
      component: 'Password',
      rules: [
        {
          type: 'required',
          message: '请再次输入密码',
          trigger: 'blur'
        },
        {
          type: 'jsExpr',
          value: '{{ $values.password === $values.confirmPassword }}',
          message: '两次输入的密码不一致',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '手机号',
      name: 'phone',
      component: 'Input',
      props: {
        placeholder: '请输入手机号',
        maxlength: 11
      },
      rules: [
        {
          type: 'required',
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          type: 'pattern',
          value: '^1[3-9]\\d{9}$',
          message: '手机号格式有误',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '邮箱',
      name: 'email',
      component: 'Input',
      props: {
        placeholder: '请输入邮箱'
      },
      rules: [
        {
          type: 'builtin',
          value: 'email',
          message: '请输入有效的邮箱',
          trigger: 'blur'
        }
      ]
    }
  ]
} satisfies FormSchema
