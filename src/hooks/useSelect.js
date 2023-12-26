import { ref, reactive, computed, watch, onMounted, inject } from 'vue'
import { isEqual, isPlainObject, debounce } from 'lodash'
import { getDataByPath } from '@/utils'

const useSelect = (props, emits) => {
  const $selectData = inject('$selectData')

  const $request = inject('$request')

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

  const stateParams = reactive({
    pageNum: 1,
    pageSize: 10
    // filters: {},
    // orderBys: {},
  })

  const fetchData = debounce(async () => {
    const { baseURL, url, method, params, data, dataPath } = props.api
    loading.value = true

    const res = await $request({
      baseURL,
      url,
      method,
      params: { ...params, ...stateParams },
      data: { ...data, ...stateParams }
    })

    const resData = getDataByPath(res, dataPath)

    selectOptions.value = resData.map((item) => {
      if (isPlainObject(item)) {
        return item
      }
      return { label: item, value: item }
    })
    loading.value = false
  }, 300)

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
        // console.log(newVal, oldVal);
        fetchData()
      }
    }
  )

  watch(selectOptions, (newVal) => {
    const { autoSelectedFirst, modelValue, valueKey, multiple, sort } = props
    // 自动选中第一项
    if (autoSelectedFirst && newVal.length && !modelValue?.length) {
      const firstValue = multiple ? [newVal[0][valueKey]] : newVal[0][valueKey]
      console.log(multiple, firstValue)
      emits('update:modelValue', firstValue)
      selectChange(firstValue)
    }

    if (sort) {
      selectOptions.value = selectOptions.value.sort((a, b) => a.value - b.value)
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
    const { name, valueKey, multiple } = props

    let selectData = {}

    if (multiple) {
      //多选就过滤出vals对应的源数据
      selectData = selectOptions.value.filter((item) => {
        return val.includes(item[valueKey])
      })
    } else {
      //单选找到单项对应的源数据
      selectData = selectOptions.value.find((item) => item[valueKey] === val)
    }

    //如果接到了$selectData，给顶级组件保存当前值对应得数据源
    if ($selectData) {
      $selectData[name] = selectData
    }
    emits('onChangeSelect', selectData)
  }

  return { selectVal, selectChange, selectOptions, loading }
}

export default useSelect
