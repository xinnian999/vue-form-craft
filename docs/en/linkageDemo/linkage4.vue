<template>
  <FormRender :schema="schema" @finish="finish" style="max-width: 600px" />
</template>

<script setup lang="ts">
const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '选择商品',
      component: 'Select',
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
            price: 100
          }
        ],
        placeholder: '请选择...',
        labelKey: 'name',
        valueKey: 'id'
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
      label: '价格',
      component: 'InputNumber',
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

const finish = (values) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
