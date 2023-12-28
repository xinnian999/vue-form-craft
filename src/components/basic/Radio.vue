<template>
  <el-radio-group
    v-model="selectVal"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="selectChange"
    v-loading="loading"
  >
    <template v-if="optionType === 'circle' || optionType === 'border'">
      <el-radio
        v-for="item in currentOptions"
        :key="item[valueKey]"
        :label="item[valueKey]"
        :border="optionType === 'border'"
        >{{ item[labelKey] }}</el-radio
      >
    </template>

    <el-space v-if="optionType === 'button'" wrap :size="[space, space]">
      <el-radio-button
        v-for="item in currentOptions"
        :key="item[valueKey]"
        :label="item[valueKey]"
        size="large"
        >{{ item[labelKey] }}</el-radio-button
      >
    </el-space>
  </el-radio-group>
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
  optionType: {
    type: String,
    default: 'circle'
  },
  space: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const { selectVal, currentOptions, selectChange, loading } = useSelect(props, emits)
</script>

<style lang="scss" scoped></style>
