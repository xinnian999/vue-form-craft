<template>
  <remote-schema-form v-model="formValues" schemaId="3" @onSubmit="onSubmit" />
</template>

<script setup>
import { ref } from 'vue'

const formValues = ref({})
const onSubmit = (values) => {
  alert(JSON.stringify(values))
}
</script>
