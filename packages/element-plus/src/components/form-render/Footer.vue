<template>
  <div :style="styles" v-if="formInstance.footer">
    <el-button type="primary" @click="formInstance.submit" name="submit-btn">提交</el-button>
    <el-button @click="() => formInstance.resetFields()"  name="reset-btn">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { useFormInstance } from '@form-magic/core'
import { computed } from 'vue'

const formInstance = useFormInstance()

const styles = computed(() => ({ marginLeft: formInstance.schema.labelWidth + 'px' }))
</script>
