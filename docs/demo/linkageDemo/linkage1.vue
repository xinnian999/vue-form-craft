<template>
  <FormRender :schema="schema" footer @finish="finish" />
</template>

<script setup lang="ts">
const schema = {
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
      designKey: 'form-Lx4g',
      name: 'rate',
      required: true
    },
    {
      label: '差评原因',
      component: 'TextArea',
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
      designKey: 'form-XyJs',
      name: 'reason',
      hidden: '{{ $values.rate>=3 || !$values.rate }}' // 评分未选中 或 评分<3时隐藏差评原因
    }
  ]
}

const finish = (values:Record<string,any>) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
