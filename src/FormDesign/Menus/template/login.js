export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'input',
      props: {
        placeholder: '请输入用户名'
      },
      onlyId: 'form-eNR0',
      name: 'username',
      required: true
    },
    {
      label: '密码',
      component: 'password',
      props: {
        placeholder: '请输入密码'
      },
      onlyId: 'form-D1x7',
      name: 'password',
      required: true
    },
    {
      label: '',
      component: 'inline',
      children: [
        {
          component: 'button',
          props: {
            name: '登陆',
            clickEvent: 'submitForm'
          },
          onlyId: 'form-aBMY',
          name: 'submit',
          hideLabel: true
        },
        {
          component: 'button',
          props: {
            name: '注册',
            clickEvent: 'resetForm',
            style: {
              marginLeft: '20px'
            }
          },
          onlyId: 'form-mtnY',
          name: 'IxjeOB',
          hideLabel: true
        }
      ],
      onlyId: 'form-0dVt',
      name: 'j0rCIj'
    }
  ]
}
