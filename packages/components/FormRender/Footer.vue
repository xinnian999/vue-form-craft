<template>
  <div :style="styles" v-if="formInstance.footer">
    <Button type="primary" @click="formInstance.submit" name="submit-btn">提交</Button>
    <Button @click="() => formInstance.resetFields()" name="reset-btn">重置</Button>
  </div>
</template>

<script setup lang="ts">
import { useComponents, useFormInstance } from '@form-magic/core'
import { computed } from 'vue'

const formInstance = useFormInstance()

const { Button } = useComponents()

const styles = computed(() => ({ marginLeft: formInstance.schema.labelWidth + 'px' }))
</script>
