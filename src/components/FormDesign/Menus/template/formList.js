export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '自增容器',
      component: 'FormList',
      children: [
        {
          label: '单行文本',
          component: 'Input',
          props: {
            autocomplete: 'off',
            showWordLimit: true,
            type: 'text'
          },
          onlyId: 'form-JuGq',
          name: 'name'
        },
        {
          label: '单行文本',
          component: 'Input',
          props: {
            autocomplete: 'off',
            showWordLimit: true,
            type: 'text'
          },
          onlyId: 'form-JuGq',
          name: 'desc',
          hidden: '{{$item.name==="aaa"}}'
        }
      ],
      onlyId: 'form-wC99',
      name: '7aJJ2x',
      props: {
        mode: 'card'
      }
    }
  ]
}
