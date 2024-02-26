export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
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
          name: 'username'
        },
        {
          label: '密码',
          component: 'Password',
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
            'inline-prompt': 0
          }
        }
      ],
      props: {
        mode: 'table'
      },
      designKey: 'design-pMUa',
      name: 'form-kWJU'
    }
  ]
}
