import type { FormSchema } from "@/release";

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
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
      required: true
    },
    {
      label: '手机号',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      designKey: 'form-qx0M',
      name: 'phoneNumber',
      required: true
    },
    {
      label: '验证码',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      designKey: 'form-M7xE',
      name: 'code'
    }
  ]
} satisfies FormSchema
