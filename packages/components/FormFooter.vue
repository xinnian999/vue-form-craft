<template>
  <div :style="styles" v-if="formInstance.footer">
    <el-button type="primary" @click="formInstance.submit">提交</el-button>
    <el-button @click="() => formInstance.resetFields()">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/release'
import { computed } from 'vue'

const formInstance = useFormInstance()

const styles = computed(() => ({ marginLeft: formInstance.schema.labelWidth + 'px' }))
</script>
