<template>
  <form-design
    v-model="schema"
    :previewSchemaContext="{ onTest: () => console.log(666) }"
    @onSave="onSave"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FormDesign } from '@/components'

const schema = ref({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: []
})

const onSave = (schema) => {
  console.log(schema)
}
</script>
