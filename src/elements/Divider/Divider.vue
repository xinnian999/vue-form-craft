<template>
  <ElDivider v-bind="$attrs">{{ title }}</ElDivider>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus'
import { defineProps } from 'vue'

defineProps<{title:string}>()
</script>

