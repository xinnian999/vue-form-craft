<template>
  <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
  <el-radio-group v-model="selectVal" @change="selectChange" v-el-loading="loading" v-bind="$attrs">
    <el-space wrap :direction="direction" :size="[space, space]" alignment="normal">
      <template v-if="optionType === 'circle' || optionType === 'border'">
        <el-radio
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[valueKey]"
          :border="optionType === 'border'"
          >{{ item[labelKey] }}</el-radio
        >
      </template>

      <template v-else>
        <el-radio-button
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[valueKey]"
          :size="$attrs.size"
          >{{ item[labelKey] }}
        </el-radio-button>
      </template>
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

  direction: {
    type: String,
    default: 'horizontal'
  },
  space: {
    type: Number,
    default: 20
  }
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const { selectVal, currentOptions, selectChange, loading } = useSelect(props, emits)
</script>

<style lang="scss" scoped></style>
