<template>
  <el-cascader
    v-model="value"
    :options="selectOptions"
    :loading="loading"
    :show-all-levels="!takeLastLevel"
    :props="{
      multiple
    }"
  />
</template>

<script setup lang="jsx">
import { defineProps, defineEmits, computed } from 'vue'
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
  api: Object,
  name: String,
  size: {
    type: String,
    default: 'default'
  },
  style: null,
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

const { selectOptions, selectChange, loading } = useSelect(props, emits)
</script>

<style></style>
