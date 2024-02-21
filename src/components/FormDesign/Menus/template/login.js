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
      component: 'Grid',
      children: [
        {
          component: 'Button',
          props: {
            name: '登陆',
            clickEvent: 'submitForm',
            style: {
              'margin-left': 'auto',
              display: 'flex'
            }
          },
          designKey: 'form-aBMY',
          name: 'submit',
          hideLabel: true
        },
        {
          component: 'Button',
          props: {
            name: '注册',
            clickEvent: 'resetForm',
            style: {}
          },
          designKey: 'form-mtnY',
          name: 'IxjeOB',
          hideLabel: true
        }
      ],
      props: {
        colCount: 2,
        space: 20
      },
      designKey: 'form-WNcq',
      name: 'HeDkKP'
    }
  ]
}
