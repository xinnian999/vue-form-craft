<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit" style="margin-left: 150px;">提交</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema, FormRenderInstance } from 'vue-form-craft'

const formRef = ref<FormRenderInstance>()

const formValues = ref({})

const schema: FormSchema = {
  size: 'default',
  labelAlign: 'right',
  labelWidth: 150,
  items: [
    {
      label: '验证码',
      component: 'Custom',
      name: 'form-oEBQ',
      props: {
        componentName: 'vfc-code'
      },
      designKey: 'design-tDWe'
    }
  ],
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value, null, 2))
}
</script>
