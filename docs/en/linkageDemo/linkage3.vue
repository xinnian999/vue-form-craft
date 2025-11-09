<template>
  <FormRender :schema="schema" @finish="finish" style="max-width: 600px" />
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
      props: {
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
      props: {
        placeholder: '请输入...'
      },
      name: 'item2'
    },
    {
      label: '字段3',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      name: 'item3'
    }
  ]
}

const finish = (values) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
