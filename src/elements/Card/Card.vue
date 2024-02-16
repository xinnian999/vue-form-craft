<template>
  <ElCard v-bind="{ ...props, ...$attrs }">
    <FormRender v-model="value" :formItems="children" />
    <slot />
  </ElCard>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { ElCard } from 'element-plus'
import { FormRender } from '@/components'

const thisProps = defineProps({
  modelValue: Object,
  props: Object,
  children: Array,
  design: Boolean
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return thisProps.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
