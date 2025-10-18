<template>
  <FormRender :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'form-craft'

const schema: FormSchema = {
  labelWidth: 120,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '选择日期',
      name: 'date',
      component: 'DatePicker',
      props: {
        type: 'date',
        placeholder: '请选择日期',
        disabledDate: '{{ (time) => time.getTime() < new Date().setHours(0, 0, 0, 0) }}'
      }
    }
  ]
}

const onFinish = (values: any) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
