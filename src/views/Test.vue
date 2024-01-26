<template>
  <RemoteSchemaForm v-model="formValues" schema-id="2" ref="formRef" />
  <button @click="handleSubmit">提交</button>
</template>

<script setup>
import { ref } from 'vue'
import { RemoteSchemaForm } from '@/components'

const formRef = ref()

const formValues = ref({})

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch((e) => console.log(e))
}
</script>
