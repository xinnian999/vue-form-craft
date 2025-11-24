<template>
  <div style="width: 400px; margin: 20px auto">
    <FormRender v-model="formValues" ref="form" :schema="schema" />
    <el-button style="width: 100%" type="primary" @click="handleSubmit"> 立即登陆 </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { FormSchema } from 'formora'

const formValues = ref({})

const form = useTemplateRef('form')

const schema: FormSchema = {
  labelWidth: 120,
  labelAlign: 'top',
  size: 'default',
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

const handleSubmit = async () => {
  await form.value.validate()

  const data = JSON.stringify(formValues.value, null, 2)

  alert(data)
}
</script>
