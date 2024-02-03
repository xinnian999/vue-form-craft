export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '字段1',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      onlyId: 'form-NASi',
      name: 'item1',
      change: [
        {
          target: 'item2',
          value: '{{$val}}'
        },
        {
          target: 'item3',
          value: "{{$val + '元'}}"
        }
      ]
    },
    {
      label: '字段2',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      onlyId: 'form-Nasd',
      name: 'item2'
    },
    {
      label: '字段3',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      onlyId: 'form-KI1N',
      name: 'item3'
    }
  ]
}
