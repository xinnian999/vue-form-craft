<template>
  <FormRender v-model="formValues" :schema="schema" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from '@form-magic/element-plus'

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 100,
  labelAlign: 'right',
  size: 'default',
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
        placeholder: "{{ $values.name + '的简介' }}",
        disabled: '{{ !$values.name }}'
      }
    }
  ]
}
</script>
