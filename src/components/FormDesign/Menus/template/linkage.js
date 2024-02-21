export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '评分',
      component: 'Rate',
      props: {
        max: 5,
        'allow-half': true
      },
      onlyId: 'form-Lx4g',
      name: 'rate',
      style: {},
      required: true
    },
    {
      label: '差评原因',
      component: 'Textarea',
      props: {
        autocomplete: 'off',
        showWordLimit: true,
        type: 'textarea',
        autosize: {
          minRows: 4,
          maxRows: 999
        },
        placeholder: '请输入...'
      },
      onlyId: 'form-XyJs',
      name: 'reason',
      style: {},
      hidden: '{{!$values.rate||$values.rate>3}}'
    }
  ]
}
