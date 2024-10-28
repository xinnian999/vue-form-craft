import type { FormSchema } from "@vue-form-craft/types";

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '增添管理员',
      name: 'vip',
      component: 'Switch',
      props: { 'inline-prompt': false },
      designKey: 'design-kVO2111',
      change: [
        { target: 'users.*.vip', condition: '{{ $values.vip }}', value: 1 }
      ]
    },
    {
      label: '增添用户',
      component: 'FormList',
      children: [
        {
          label: '用户名',
          component: 'Input',
          props: {
            placeholder: '请输入文本'
          },
          designKey: 'design-M91n',
          name: 'username',
          change: [
            {
              target: 'users.[].vip',
              condition: '{{ $item.username.includes("admin") }}',
              value: 1
            }
          ]
        },
        {
          label: '密码',
          component: 'Input',
          props: {
            placeholder: '请输入密码'
          },
          designKey: 'design-kVO2',
          name: 'password'
        },
        {
          label: '设为管理员',
          component: 'Switch',
          designKey: 'design-jC1O',
          name: 'vip',
          props: {
            'inline-prompt': false,
            'active-value': 1,
            'inactive-value': 0
          }
        }
      ],
      props: {
        mode: 'table'
      },
      designKey: 'design-pMUa',
      name: 'users'
    }
  ]
}  satisfies FormSchema
