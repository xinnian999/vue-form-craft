<template>
  <div :style="styles" v-if="formInstance.footer">
    <a-button type="primary" @click="formInstance.submit" name="submit-btn">提交</a-button>
    <a-button @click="() => formInstance.resetFields()"  name="reset-btn">重置</a-button>
  </div>
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/core'
import { computed } from 'vue'

const formInstance = useFormInstance()

const styles = computed(() => ({ marginLeft: formInstance.schema.labelWidth + 'px' }))
</script>
