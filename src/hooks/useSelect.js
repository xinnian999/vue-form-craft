import { ref, computed, watch, onMounted, inject } from 'vue'
import { isEqual, isPlainObject, debounce } from 'lodash'
import { getDataByPath } from '@/utils'
import { $selectData, $global } from '@/config/symbol'

const useSelect = (props, emits) => {
  const selectData = inject($selectData)

  const { request } = inject($global)

  const selectVal = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emits('update:modelValue', val)
    }
  })

  const currentOptions = ref([])

  const loading = ref(false)

  const fetchData = debounce(async () => {
    if (!props.api) return

    const { baseURL, url, method, params, data, dataPath } = props.api

    loading.value = true

    const res = await request({
      baseURL,
      url,
      method,
      params,
      data
    })

    const resData = getDataByPath(res, dataPath)

    const resDataParse = resData.map((item) => {
      if (isPlainObject(item)) {
        return item
      }
      return { label: item, value: item }
    })

    currentOptions.value = [...currentOptions.value, ...resDataParse]

    loading.value = false
  }, 300)

  onMounted(() => {
    const { mode, options } = props
    if (mode === 'static') {
      currentOptions.value = options
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
        currentOptions.value = []
        fetchData()
      }
    }
  )

  watch(currentOptions, (newVal) => {
    const { autoSelectedFirst, modelValue, valueKey, multiple } = props
    // 自动选中第一项
    if (autoSelectedFirst && newVal.length && !modelValue?.length) {
      const firstValue = multiple ? [newVal[0][valueKey]] : newVal[0][valueKey]
      emits('update:modelValue', firstValue)
      selectChange(firstValue)
    }
  })

  watch(
    () => props.options,
    (newVal) => {
      if (props.mode === 'static') {
        currentOptions.value = newVal
      }
    }
  )

  watch(
    () => props.mode,
    (newVal) => {
      if (newVal === 'static') {
        currentOptions.value = props.options
      }
      if (newVal === 'remote') {
        currentOptions.value = []
        fetchData()
      }
    }
  )

  const selectChange = (val) => {
    const { valueKey, multiple, name } = props

    let valueData = {}

    if (multiple) {
      //多选就过滤出vals对应的源数据
      valueData = currentOptions.value.filter((item) => {
        return val.includes(item[valueKey])
      })
    } else {
      //单选找到单项对应的源数据
      valueData = currentOptions.value.find((item) => item[valueKey] === val)
    }

    //如果接到了selectData，给顶级组件保存当前值对应得数据源
    if (selectData) {
      selectData[name] = valueData
    }
    emits('onChangeSelect', selectData)
  }

  return { selectVal, selectChange, currentOptions, loading, fetchData }
}

export default useSelect
