export default {
  name: '级联选择器',
  initialValues: {
    label: '级联选择器',
    component: 'cascader',
    props: {
      mode: 'static',
      options: [
        {
          label: 666,
          value: 666,
          children: [
            {
              label: '666a',
              value: '666a'
            }
          ]
        },
        {
          label: 777,
          value: 777
        }
      ]
    }
  }
}
