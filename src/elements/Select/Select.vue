<template>
  <el-select
    v-model="value"
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
import { defineProps,defineModel  } from 'vue'
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

const value = defineModel<SelectValue | SelectValue[]>({ default: [] })

const { currentOptions, selectChange, loading } = useSelect(props)
</script>
