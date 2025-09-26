<template>
  <FormRender v-model="formValues" :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const formValues = ref({})

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
      props: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '密码',
      component: 'Password',
      name: 'password',
      required: true,
      props: {
        placeholder: '请输入密码'
      }
    }
  ]
}

const onFinish = async () => {
  const data = JSON.stringify(formValues.value, null, 2)

  alert(data)
}
</script>
