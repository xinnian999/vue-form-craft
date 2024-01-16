<template>
  <form-design v-model="schema" @onSave="onSave" />
</template>

<script setup>
import { ref } from 'vue'

const schema = ref({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: []
})

const onSave = () => {
  console.log(schema.value)
}
</script>
