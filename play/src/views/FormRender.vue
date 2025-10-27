<template>
  <el-card header="表单渲染">
    <FormRender v-model="formValues" :schema="schema" @finish="onFinish" />
  </el-card>
</template>

<script setup lang="ts">
import type { FormSchema } from 'form-craft'
import { ref } from 'vue'

const formValues = ref({})

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  scrollToError: true,
  submitBtn: true,
  resetBtn: true,
  style: {
    width: '500px'
  },
  items: [
    {
      label: '用户名',
      component: 'Input',
      props: {
        placeholder: '请输入用户名',
        clearable: true,
        autocomplete: 'new-password'
      },
      name: 'username',
      initialValue: 'huyilin'
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码',
        autocomplete: 'new-password'
      },
      name: 'password'
    }
  ]
} satisfies FormSchema

const onFinish = (values: Record<string, any>) => {
  alert(JSON.stringify(formValues.value, null, 2))
}
</script>
