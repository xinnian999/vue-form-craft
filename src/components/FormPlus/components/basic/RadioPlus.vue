<template>
  <el-radio-group
    v-model="selectVal"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="selectChange"
  >
    <template v-if="optionType === 'circle' || optionType === 'border'">
      <el-radio
        v-for="item in selectOptions"
        :key="item[valueKey]"
        :label="item[valueKey]"
        :border="optionType === 'border'"
        >{{ item[labelKey] }}</el-radio
      >
    </template>

    <el-space v-if="optionType === 'button'" wrap :size="[space, space]">
      <el-radio-button
        v-for="item in selectOptions"
        :key="item[valueKey]"
        :label="item[valueKey]"
        size="large"
        >{{ item[labelKey] }}</el-radio-button
      >
    </el-space>
  </el-radio-group>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch, inject, onMounted } from 'vue'
import { isString, isEqual } from 'lodash'

const request = () => {}

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

const selectVal = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const selectOptions = ref([])

const loading = ref(false)

const $selectData = inject('$selectData')

const fetchData = async () => {
  const { baseURL, url, method, data = {} } = props.api
  loading.value = true

  const { list } = await request({
    baseURL,
    url,
    method,
    data
  })

  selectOptions.value = list.map((item) => {
    if (isString(item)) {
      return { label: item, value: item }
    }
    return item
  })
  loading.value = false
}

onMounted(() => {
  const { mode, options } = props
  if (mode === 'static') {
    selectOptions.value = options
  }
  if (mode === 'remote') {
    fetchData()
  }
})

watch(
  () => props.api,
  (newVal, oldVal) => {
    //bug：这里发生只api内存地址变化，实际api无变化也会触发监听。暂时使用深层对比解决
    if (!isEqual(newVal, oldVal)) {
      fetchData()
    }
  }
)

watch(selectOptions, (newVal) => {
  const { autoSelectedFirst, modelValue, valueKey } = props

  // 自动选中第一项
  if (autoSelectedFirst && newVal.length && !modelValue) {
    emits('update:modelValue', newVal[0][valueKey])
    selectChange(newVal[0][valueKey])
  }
})

watch(
  () => props.options,
  (newVal) => {
    if (props.mode === 'static') {
      selectOptions.value = newVal
    }
  }
)

const selectChange = (val) => {
  const { name, valueKey } = props

  const item = selectOptions.value.find((item) => item[valueKey] === val)

  $selectData[name] = item
}
</script>

<style lang="scss" scoped></style>
