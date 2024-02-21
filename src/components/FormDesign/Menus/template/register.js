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
      onlyId: 'form-eNR0',
      name: 'username',
      required: true
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      onlyId: 'form-D1x7',
      name: 'password',
      required: true
    },
    {
      label: '手机号',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      onlyId: 'form-qx0M',
      name: 'phoneNumber',
      required: true
    },
    {
      label: '验证码',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      onlyId: 'form-M7xE',
      name: 'code'
    },
    {
      component: 'Button',
      props: {
        name: '立即注册',
        clickEvent: 'custom',
        style: {},
        customEvent: '{{}}'
      },
      onlyId: 'form-gW1S',
      name: '1fx9H8'
    }
  ]
}
