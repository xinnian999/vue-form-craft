<template>
  <div class="form-item-inline">
    <DefaultCanvasWrapper
      v-if="formInstance.design"
      :children="children"
      :style="InlineStyle"
      title="行内布局"
      :name="name"
    />

    <div v-else :style="InlineStyle">
      <FormItem v-for="item in children" :key="item.name" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { FormItem, DefaultCanvasWrapper } from '@vue-form-craft/components'
import { useFormInstance } from '@vue-form-craft/hooks'
import type { FormItemType } from '@vue-form-craft/types'

const thisProps = defineProps<{
  name: string
  props: Record<string, any>
  children: FormItemType[]
}>()

const formInstance = useFormInstance()

const InlineStyle = computed<StyleValue>(() => ({
  width: '100%',
  display: 'flex',
  'justify-content': thisProps.props.align,
  'flex-wrap': thisProps.props.autoWrap ? 'wrap' : 'nowrap',
  'overflow-x': 'auto',
  gap: `${thisProps.props.gap}px`
}))
</script>

<style scoped lang="scss">
.form-item-inline {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}
</style>
