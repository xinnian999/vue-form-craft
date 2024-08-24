<template>
  <el-cascader
    v-model="selectVal"
    :options="currentOptions"
    :loading="loading"
    :props="{
      multiple
    }"
    v-bind="$attrs"
    @change="selectChange"
  />
</template>

<script setup  lang="ts">
import { defineProps } from 'vue'
import { ElCascader, type CascaderValue } from 'element-plus'
import useSelect from '@/hooks/useSelect'
import type { SelectProps } from '@/config/commonType';

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  labelKey: 'label',
  valueKey: 'value',
  name: ''
})




const { selectVal, currentOptions, selectChange, loading } = useSelect<CascaderValue>(props)
</script>
