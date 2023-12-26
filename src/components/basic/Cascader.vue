<template>
  <el-cascader v-model="value" :options="options" @change="handleChange" />
</template>

<script setup lang="jsx">
import { defineProps, defineEmits } from 'vue'
import useSelect from '@/hooks/useSelect'

const props = defineProps({
  modelValue: {},
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
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
  autoSelectedFirst: {
    type: Boolean,
    default: false
  },
  api: Object,
  name: String,
  size: {
    type: String,
    default: 'default'
  },
  style: null,
  filterKey: { default: 'filter', type: String },
  formatter: Function,
  sort: Boolean
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const { selectVal, selectOptions, selectChange, loading } = useSelect(props, emits)
</script>

<style></style>
