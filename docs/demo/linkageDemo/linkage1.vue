<template>
  <FormRender :schema="schema" @finish="finish" />
</template>

<script setup lang="ts">
const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '评分',
      component: 'Rate',
      componentProps: {
        max: 5,
        'allow-half': true
      },
      name: 'rate',
      required: true
    },
    {
      label: '差评原因',
      component: 'TextArea',
      componentProps: {
        autocomplete: 'off',
        showWordLimit: true,
        type: 'textarea',
        autosize: {
          minRows: 4,
          maxRows: 999
        },
        placeholder: '请输入...'
      },
      name: 'reason',
      when: '{{ $values.rate<3 && $values.rate>0 }}' // 评分<3时可输入差评原因
    }
  ]
}

const finish = (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
