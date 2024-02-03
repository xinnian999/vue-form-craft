<template>
  <span id="NumberInput">
    <el-input-number v-bind="{ ...$attrs, ...props }" v-model="value" />
    <span class="unit" v-if="unit">{{ unit }} </span>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { ElInputNumber } from 'element-plus'

const props = defineProps({
  modelValue: Number,
  unit: String,
  min: { type: Number, default: 0 },
  max: Number,
  disabled: Boolean,
  step: { type: Number, default: 1 }
})

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>

<style lang="less" scoped>
#NumberInput {
  position: relative;
  .unit {
    margin: 0 5px;
  }
}
</style>
