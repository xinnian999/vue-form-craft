<template>
  <FormRender :schema="schema" @finish="finish" />
</template>

<script setup lang="ts">
const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  submitBtn: true,
  size: 'default',
  items: [
    {
      label: '选择商品',
      component: 'Select',
      componentProps: {
        mode: 'static',
        options: [
          {
            label: '商品1',
            value: '1',
            price: 25
          },
          {
            label: '商品2',
            value: '2',
            price: 65
          },
          {
            label: '商品3',
            value: '3',
            price: 100
          }
        ],
        placeholder: '请选择...'
      },
      name: 'commodity',
      designKey: 'design-commodity',
      linkages: [
        {
          target: 'price',
          type: 'data',
          value: '{{ $selectData.commodity.price }}'
        }
      ]
    },
    {
      label: '价格(元)',
      component: 'InputNumber',
      name: 'price',
      componentProps: {
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

const finish = (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
