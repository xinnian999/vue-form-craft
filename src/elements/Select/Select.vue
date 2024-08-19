<template>
  <el-select
    v-model="selectVal"
    v-bind="$attrs"
    @change="selectChange"
    :multiple="multiple"
    clearable
    filterable
    v-el-loading="loading"
  >
    <el-option
      v-for="item in currentOptions"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    >
      {{ item[labelKey] }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import useSelect from '@/hooks/useSelect'
import type { SelectProps, SelectValue } from '@/config/commonType'

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  labelKey: 'label',
  valueKey: 'value',
  name: ''
})

const { selectVal, currentOptions, selectChange, loading } = useSelect<SelectValue | SelectValue[]>(props)
</script>
