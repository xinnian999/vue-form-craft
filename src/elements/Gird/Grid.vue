<template>
  <div class="form-item-grid">
    <DefaultCanvasWrapper
      v-if="design"
      :children="children"
      :style="gridStyle"
      title="栅格布局"
      :name="name"
    />

    <div v-else :style="gridStyle">
      <FormRender :formItems="children" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { FormRender, DefaultCanvasWrapper } from '@/components'

const thisProps = defineProps({
  name: String,
  props: Object,
  children: Array,
  design: Boolean
})

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${thisProps.props.columns}, 1fr)`,
  'row-gap': thisProps.props['row-gap'] + 'px',
  'column-gap': thisProps.props['column-gap'] + 'px'
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
</style>
