<template>
  <div class="form-item-grid">
    <div v-if="design" class="default">
      <div class="title">【{{ config.name }}】 {{ name }}</div>
      <CanvasWrapper :children="children" :style="gridStyle" />
    </div>

    <div v-else :style="gridStyle">
      <FormRender :formItems="children" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { FormRender, CanvasWrapper } from '@/components'

const thisProps = defineProps({
  name: String,
  props: Object,
  children: Array,
  design: Boolean,
  config: Object
})

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${thisProps.props.columns}, 1fr)`,
  'row-gap': thisProps.props['row-gap'] + 'px',
  'column-gap': thisProps.props['column-gap'] + 'px'
  // 'overflow-x': 'auto'
}))
</script>

<style scoped lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}

.default {
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
  }
}
</style>
