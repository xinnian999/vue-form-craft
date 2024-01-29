<template>
  <el-select
    v-model="selectVal"
    v-bind="$attrs"
    @change="selectChange"
    :multiple="multiple"
    clearable
    filterable
    ref="selectRef"
    v-selectLoadMore:[popperClass]="fetchData"
    :popper-class="popperClass"
  >
    <template #empty v-if="tableDrop">
      <el-table
        v-tableLoadMore="fetchData"
        :data="currentOptions"
        max-height="250"
        @current-change="handleCurrentChange"
      >
        <el-table-column v-if="!multiple" width="40px">
          <template #default="scope">
            <el-radio v-model="selectVal" :label="scope.row[valueKey]">&nbsp;</el-radio>
          </template>
        </el-table-column>

        <el-table-column
          :prop="item.dataIndex"
          :label="item.title"
          :width="item.width"
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

    <template #footer>
      <div class="footer" v-loading="loading">
        {{ isMax ? '没有更多选项了' : loading ? '加载中' : '滚动到底加载更多选项' }}
      </div>
    </template>
  </el-select>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { ElSelect, ElRadio, ElTable, ElOption, ElTableColumn } from 'element-plus'
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
  columns: { default: () => [], type: Array }
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const selectRef = ref(null)

const popperClass = getRandomId(8) + '-popper'

const { selectVal, currentOptions, selectChange, loading, fetchData, isMax } = useSelect(
  props,
  emits
)

//table单选回调
const handleCurrentChange = (row) => {
  if (row) {
    emits('update:modelValue', row[props.valueKey])
    selectRef.value.blur()
  }
}
</script>

<style lang="less" scoped>
.footer {
  text-align: center;
}
</style>
