<template>
  <FormRender :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'form-craft'

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  scrollToError: true,
  submitBtn: true,
  items: [
    {
      label: '用户名',
      component: 'Input',
      props: {
        placeholder: '请输入用户名',
        clearable: true
      },
      name: 'username'
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      name: 'password'
    }
  ]
} satisfies FormSchema

const onFinish = (values: Record<string, any>) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
