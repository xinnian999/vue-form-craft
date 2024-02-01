<template>
  <ElDivider v-bind="$attrs">{{ title }}</ElDivider>
</template>

<script setup>
import { ElDivider } from 'element-plus'
import { defineProps } from 'vue'

defineProps({
  title: String
})
</script>

<style></style>
