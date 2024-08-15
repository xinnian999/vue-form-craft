<template>
  <div class="form-item-inline">
    <DefaultCanvasWrapper
      v-if="design"
      :children="children"
      :style="InlineStyle"
      title="行内布局"
      :name="name"
    />

    <div v-else :style="InlineStyle">
      <FormItemRender :formItems="children" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { FormItemRender, DefaultCanvasWrapper } from '@/components'

const thisProps = defineProps({
  name: String,
  props: Object,
  children: Array,
  design: Boolean
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
</style>
