export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '选择商品',
      component: 'select',
      props: {
        mode: 'static',
        options: [
          {
            name: '商品1',
            id: '1',
            price: 25
          },
          {
            name: '商品2',
            id: '2',
            price: 65
          },
          {
            name: '商品3',
            id: '3',
            price: 66
          }
        ],
        placeholder: '请选择...',
        labelKey: 'name',
        valueKey: 'id'
      },
      onlyId: 'form-2Rtu',
      name: 'commodity',
      change: [
        {
          target: 'price',
          value: '{{$selectData.commodity?.price}}'
        }
      ]
    },
    {
      label: '价格',
      component: 'inputNumber',
      onlyId: 'form-rS3W',
      name: 'price',
      props: {
        min: 1,
        max: 9999,
        step: 1,
        unit: '元',
        disabled: true,
        controlsPosition: 'right'
      }
    }
  ]
}
