<template>
  <div :style="gridStyle" class="form-item-grid">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import useStyle from '@/hooks/useStyle'

const props = defineProps({
  space: Number,
  colCount: Number
})
const gridStyle = useStyle('Grid', props)
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
