<template>
  <FormRender :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'vue-form-craft'

const schema: FormSchema = {
  labelWidth: 120,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '用户名',
      component: 'Input',
      name: 'username',
      required: true,
      componentProps: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '密码',
      component: 'Password',
      name: 'password',
      required: true,
      componentProps: {
        placeholder: '请输入密码'
      }
    }
  ]
}

const onFinish = async (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
