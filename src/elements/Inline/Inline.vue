<template>
  <div class="form-item-inline">
    <div v-if="design" class="default">
      <div class="title">【{{ config.name }}】 {{ name }}</div>
      <CanvasWrapper :children="children" :style="InlineStyle" />
    </div>

    <div v-else :style="InlineStyle">
      <FormRender :formItems="children" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { FormRender } from '@/components'
import CanvasWrapper from '@/FormDesign/Canvas/CanvasWrapper.vue'

const thisProps = defineProps({
  name: String,
  props: Object,
  children: Array,
  design: Boolean,
  config: Object
})

const InlineStyle = computed(() => ({
  width: '100%',
  display: 'flex',
  'justify-content': thisProps.props.align,
  'flex-wrap': thisProps.props.autoWrap ? 'wrap' : 'nowrap',
  'overflow-x': 'auto',
  gap: `${thisProps.props.gap}px`
}))
</script>

<style scoped lang="less">
.form-item-inline {
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
