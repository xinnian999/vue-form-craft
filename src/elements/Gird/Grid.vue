<template>
  <div :style="gridStyle" class="form-item-grid">
    <FormRender v-model="value" :formItems="children" />
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'
import useStyle from '@/hooks/useStyle'
import { FormRender } from '@/components'

const thisProps = defineProps({
  modelValue: Object,
  props: Object,
  children: Array,
  design: Boolean
})
const gridStyle = useStyle('Grid', thisProps.props)

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
