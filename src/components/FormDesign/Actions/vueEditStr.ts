import type { FormSchema } from '@/release'

export const tsVue= (schema: FormSchema) => {
  const str = JSON.stringify(schema, null, 2)

  return `<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">提交</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema,FormRenderInstance } from 'vue-form-craft'

const formRef = ref<FormRenderInstance>()

const formValues = ref({})

const schema: FormSchema = ${str}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value,null,2))
}
</script>
`
}


export const jsVue= (schema: FormSchema) => {
  const str = JSON.stringify(schema, null, 2)

  return `<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">提交</el-button>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const formValues = ref({})

const schema = ${str}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value,null,2))
}
</script>
`
}
