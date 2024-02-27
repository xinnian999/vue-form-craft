<template>
  <el-cascader
    v-model="value"
    :options="currentOptions"
    :loading="loading"
    :show-all-levels="!takeLastLevel"
    :props="{
      multiple
    }"
    v-bind="$attrs"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { ElCascader } from 'element-plus'
import useSelect from '@/hooks/useSelect'

const props = defineProps({
  modelValue: {},
  options: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'static'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  api: Object,
  name: String,
  takeLastLevel: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    if (props.takeLastLevel) {
      emits('update:modelValue', val[val.length - 1])
    } else {
      emits('update:modelValue', val)
    }
  }
})

const { currentOptions, loading } = useSelect(props, emits)
</script>
