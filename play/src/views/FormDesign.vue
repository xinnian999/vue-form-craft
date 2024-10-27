<template>
  <FormDesign v-model="schema" />
</template>

<script setup lang="ts">
import type { FormSchema } from '@vue-form-craft/types';
import { ref } from 'vue';

const schema = ref<FormSchema>({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  scrollToError: true,
  items: []
})
</script>