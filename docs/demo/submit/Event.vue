<template>
  <FormRender :schema="schema" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'formora'

const schema: FormSchema = {
  labelWidth: 120,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '姓名',
      component: 'Input',
      name: 'name',
      required: true,
      props: {
        placeholder: '请输入姓名',
        onBlur: '{{ e => { alert("你输入了：" + e.target.value) } }}'
      }
    }
  ]
}
</script>
