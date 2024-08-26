<template>
  <el-tag :type="type">{{ text }}</el-tag>
</template>

<script setup lang="ts">
import { ElTag } from 'element-plus'

withDefaults(
  defineProps<{ text?: string; type?: "" | "success" | "info" | "warning" | "danger" }>(),
  {
    text: '标签',
    type: ''
  }
)
</script>
