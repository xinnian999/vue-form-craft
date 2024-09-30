<template>
  <div id="DefaultCanvasWrapper">
    <div class="title">【{{ title }}】 {{ name }}</div>
    <CanvasWrapper :children="children" :style="style" />
  </div>
</template>

<script setup lang="ts">
import { CanvasWrapper } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/release';

defineProps<{
  name: string,
  style?: any,
  children: FormItemType[],
  title: string
}>()
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
