<template>
  <RemoteFormDesign @onSave="(schema) => console.log(schema)" />
</template>

<script setup>
import { RemoteFormDesign } from '@/components'
</script>
