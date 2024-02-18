<template>
  <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
  <el-radio-group v-model="selectVal" @change="selectChange" v-loading="loading" v-bind="$attrs">
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
        :size="$attrs.size"
        >{{ item[labelKey] }}</el-radio-button
      >
    </el-space>
  </el-radio-group>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElRadioGroup, ElRadio, ElRadioButton, ElSpace } from 'element-plus'
import useSelect from '@/hooks/useSelect'

const props = defineProps({
  modelValue: {},
  options: {
    type: Array,
    default: () => []
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
  },
  dataPath: String
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const { selectVal, currentOptions, selectChange, loading } = useSelect(props, emits)
</script>

<style lang="scss" scoped></style>
