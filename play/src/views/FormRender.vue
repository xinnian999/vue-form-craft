<template>
  <div class="FormRenderPage">
    <FormRender
      v-model="formValues"
      :schema="schema"
      ref="formRef"
      footer
      @finish="onFinish"
      @failed="onFailed"
    />
    <!-- <el-button @click="handleSubmit">提交</el-button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema, FormInstance } from '@form-magic/element-plus'

const formRef = ref<FormInstance>()

const formValues = ref({
  // username: 'hyl',
  // password: '991015'
})

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  scrollToError: true,
  items: [
    {
      label: '用户名',
      component: 'Input',
      props: {
        placeholder: '请输入用户名',
        clearable: true
      },
      designKey: 'form-eNR0',
      name: 'username',
      required: true
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      designKey: 'form-D1x7',
      name: 'password',
      required: true
    }
  ]
} satisfies FormSchema

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
