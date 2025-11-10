import type { FormSchema } from "@/types";

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '增添管理员',
      name: 'vip',
      component: 'Switch',
      props: { 'inline-prompt': false },
      designKey: 'design-vip',
      linkages: [
        { target: 'users.*.vip', type: 'data', condition: '{{ $values.vip }}', value: 1 }
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
          name: 'username',
          designKey: 'design-username',
          linkages: [
            {
              target: 'users.[].vip',
              type: 'data',
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
          name: 'password'
        },
        {
          label: '设为管理员',
          component: 'Switch',
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
      name: 'users'
    }
  ]
} satisfies FormSchema
