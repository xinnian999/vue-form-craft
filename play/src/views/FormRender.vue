<template>
  <div class="FormRenderPage">
    <FormRender
      v-model="formValues"
      :schema="schema"
      ref="formRef"
      footer
      read
      @finish="onFinish"
      @failed="onFailed"
    />
    <!-- <el-button @click="handleSubmit">提交</el-button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema, FormInstance } from 'vue-form-craft'

const formRef = ref<FormInstance>()

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
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

const onFinish = (values: Record<string, any>) => {
  console.log(values)
}

const onFailed = (err: any[]) => {
  console.log(err)
}

// const handleSubmit = async () => {
//   await formRef.value?.validate()
//   alert(JSON.stringify(formValues.value, null, 2))
// }
</script>

<style>
.FormRenderPage {
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
