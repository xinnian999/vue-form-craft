export default (schema) => `<template>
    <schema-form v-model="formValues" :schema="schema" ref="formRef" />
    <button @click="handleSubmit">提交</button>
</template>

<script setup>
import { ref } from 'vue'

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

const schema = ${schema}

</script>

`
