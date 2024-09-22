<template>
  <form-design v-model="schema" class="docs-form-design" style="height: calc(100vh - 65px)" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const schema = ref<FormSchema>({
  items: []
})

</script>

<style>
.docs-form-design {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    line-height: auto;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
