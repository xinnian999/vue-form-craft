<template>
  <div id="vp-demo">
    <slot name="source" />
    <pre>{{ decodeURIComponent(code) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

const props = defineProps<{ code: string }>()

</script>

<style>
#vp-demo {
  border: 1px solid #eee;
  padding: 20px;
}
</style>
