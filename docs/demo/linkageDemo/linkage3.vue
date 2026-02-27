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
      label: '字段1',
      component: 'Input',
      componentProps: {
        placeholder: '请输入...'
      },
      name: 'item1',
      designKey: 'design-item1',
      linkages: [
        {
          target: 'item2',
          type: 'data',
          value: '{{$values.item1 * 2}}'
        },
        {
          target: 'item3',
          type: 'data',
          value: "{{$values.item1 + '元'}}"
        }
      ]
    },
    {
      label: '字段2',
      component: 'Input',
      componentProps: {
        placeholder: '请输入...'
      },
      name: 'item2'
    },
    {
      label: '字段3',
      component: 'Input',
      componentProps: {
        placeholder: '请输入...'
      },
      name: 'item3'
    }
  ]
}

const finish = (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
