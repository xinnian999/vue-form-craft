<template>
  <el-select
    v-model="selectVal"
    v-bind="$attrs"
    @change="selectChange"
    :multiple="multiple"
    clearable
    filterable
    v-selectLoadMore:[popperClass]="scrollFetchData"
    :popper-class="popperClass"
    :loading="loading"
  >
    <el-option
      v-for="item in currentOptions"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    >
      {{ formatter ? formatter(item[labelKey]) : item[labelKey] }}
    </el-option>

    <template #footer v-if="scrollLoad">
      <div class="footer" v-loading="loading">
        {{ isMax ? '没有更多选项了' : loading ? '加载中' : '滚动到底加载更多选项' }}
      </div>
    </template>
  </el-select>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import useSelect from '@/hooks/useSelect'
import { getRandomId } from '@/utils'

const props = defineProps({
  modelValue: {},
  options: {
    type: Array,
    default: () => []
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
  filterKey: { default: 'filter', type: String },
  formatter: Function,
  sort: Boolean,
  tableDrop: Boolean,
  columns: { default: () => [], type: Array },
  scrollLoad: Boolean
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const popperClass = getRandomId(8) + '-popper'

const { selectVal, currentOptions, selectChange, loading, fetchData, isMax } = useSelect(
  props,
  emits
)

const scrollFetchData = () => {
  if (props.scrollLoad) {
    fetchData()
  }
}
</script>

<style lang="less" scoped>
.footer {
  text-align: center;
}
</style>
