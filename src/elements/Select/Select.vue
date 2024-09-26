<template>
  <el-select
    v-model="value"
    v-bind="$attrs"
    @change="selectChange"
    :multiple="multiple"
    clearable                                             
    filterable
    v-loading="loading"
  >
    <el-option
      v-for="item in currentOptions"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
      :disabled="item[disabledKey]"
    >
      {{ item[labelKey] }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import useSelect from '@/hooks/useSelect'
import type { SelectProps, SelectValue } from '@/config/commonType'
import { watchEffect } from 'vue';

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  labelKey: 'label',
  valueKey: 'value',
  disabledKey: 'disabled',
  name: ''
})

const value = defineModel<SelectValue | SelectValue[]>({ default: [] })

const { currentOptions, selectChange, loading } = useSelect(props)

watchEffect(() => {
  console.log(currentOptions.value,props);
  
})
</script>
