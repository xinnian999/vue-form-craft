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
        // 数据联动: 批量设置所有行的 vip 值
        { target: 'users.*.vip', type: 'data', condition: '{{ $values.vip }}', value: 1 }
      ]
    },
    {
      label: '禁用所有密码输入',
      name: 'disableAllPassword',
      component: 'Switch',
      props: { 'inline-prompt': false },
      designKey: 'design-disable-all-password',
      linkages: [
        // attr联动: 批量禁用/启用所有行的 password 字段
        { 
          target: 'users.*.password', 
          type: 'attr', 
          path: 'props.disabled',
          value: '{{ $values.disableAllPassword }}'
        }
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
              // 数据联动: 当用户名包含 admin 时,设置当前行的 vip 为 1
              target: 'users.[].vip',
              type: 'data',
              condition: '{{ $item.username.includes("admin") }}',
              value: 1
            },
            {
              // attr联动: 当用户名长度 < 3 时,禁用当前行的密码输入
              target: 'users.[].password',
              type: 'attr',
              path: 'props.disabled',
              condition: '{{ $item.username && $item.username.length < 3 }}',
              value: true
            },
            {
              // attr联动: 当用户名长度 >= 3 时,启用当前行的密码输入
              target: 'users.[].password',
              type: 'attr',
              path: 'props.disabled',
              condition: '{{ $item.username && $item.username.length >= 3 }}',
              value: false
            }
          ]
        },
        {
          label: '密码',
          component: 'Input',
          props: {
            placeholder: '请输入密码'
          },
          name: 'password',
          designKey: 'design-password'
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
