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
    ref="selectRef"
  >
    <template #empty v-if="tableDrop">
      <el-table :data="currentOptions" @current-change="handleCurrentChange">
        <el-table-column v-if="!multiple" width="40px">
          <template #default="scope">
            <el-radio v-model="selectVal" :label="scope.row[valueKey]">&nbsp;</el-radio>
          </template>
        </el-table-column>

        <el-table-column
          :prop="item.dataIndex"
          :label="item.title"
          v-for="item in columns"
          :key="item.dataIndex"
        />
      </el-table>
    </template>

    <template v-if="!tableDrop">
      <el-option
        v-for="item in currentOptions"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
      >
        {{ formatter ? formatter(item[labelKey]) : item[labelKey] }}
      </el-option>
    </template>
  </el-select>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
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
  sort: Boolean,
  tableDrop: Boolean,
  columns: { default: () => [], type: Array }
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const selectRef = ref(null)

const { selectVal, currentOptions, selectChange, loading } = useSelect(props, emits)

//table单选回调
const handleCurrentChange = (row) => {
  if (row) {
    emits('update:modelValue', row[props.valueKey])
    selectRef.value.blur()
  }
}
</script>

<style lang="scss" scoped></style>
