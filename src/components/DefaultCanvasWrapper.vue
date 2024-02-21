<template>
  <div id="DefaultCanvasWrapper">
    <div class="title">【{{ title }}】 {{ name }}</div>
    <CanvasWrapper :children="children" :style="style" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { CanvasWrapper } from '@/components'

defineProps({
  name: String,
  style: Object,
  children: Array,
  title: String
})
</script>

<style scoped lang="less">
#DefaultCanvasWrapper {
  border: 2px dashed var(--el-color-primary);
  margin: 10px;
  position: relative;
  padding: 5px;
  .title {
    position: absolute;
    left: 0;
    top: -20px;
    padding: 1px 5px;
    background-color: var(--el-color-primary);
    font-size: 12px;
    color: #fff;
    z-index: 10;
    line-height: 16px;
  }
}
</style>
