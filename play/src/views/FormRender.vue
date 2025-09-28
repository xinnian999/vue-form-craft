<template>
  <div class="FormRenderPage">
    <FormRender v-model="formValues1" :schema="schema" ref="formRef" footer @finish="onFinish1" />
    <FormRender v-model="formValues2" :schema="schema" ref="formRef" footer @finish="onFinish2" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormSchema } from 'vue-form-craft'

const formRef = ref<FormInstance>()

const formValues1 = ref({})
const formValues2 = ref({})

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
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      designKey: 'form-D1x7',
      name: 'password',
    }
  ]
} satisfies FormSchema

const onFinish1 = (values: Record<string, any>) => {
  alert(JSON.stringify(values, null, 2))
}

const onFinish2 = (values: Record<string, any>) => {
  alert(JSON.stringify(values, null, 2))
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
