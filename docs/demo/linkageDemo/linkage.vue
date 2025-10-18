<template>
  <FormRender :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'form-craft'

const schema: FormSchema = {
  labelWidth: 100,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '姓名',
      component: 'Input',
      name: 'name',
      props: {
        placeholder: '请输入姓名'
      }
    },
    {
      label: '简介',
      component: 'TextArea',
      name: 'desc',
      props: {
        placeholder: "{{ $values.name ? $values.name + '的简介' : '请输入简介' }}",
        disabled: '{{ !$values.name }}'
      }
    }
  ]
}

const onFinish = (values: any) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
