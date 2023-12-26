<template>
  <el-select
    v-model="selectVal"
    :placeholder="placeholder"
    @change="selectChange"
    :disabled="disabled"
    :multiple="multiple"
    :size="size"
    :style="style"
    clearable
    filterable
    :loading="loading"
  >
    <el-option
      v-for="item in selectOptions"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    >
      {{ formatter ? formatter(item[labelKey]) : item[labelKey] }}
    </el-option>
  </el-select>
</template>

<script setup>
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

<style lang="scss" scoped></style>
