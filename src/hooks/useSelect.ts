import { ref, watch, onMounted, inject } from 'vue'
import { isEqual, isPlainObject, debounce } from 'lodash'
import { getDataByPath } from '@/utils'
import { $selectData, $global } from '@/config/symbol'
import type { SchemaApi } from '@/config/commonType'

type Props = {
  options?: Array<Record<string, any>>
  multiple?: boolean
  mode?: string
  labelKey?: string
  valueKey?: string
  api?: SchemaApi
  name?: string
}

type Option = Record<string, any>

const useSelect = (props: Props) => {
  const { selectData, updateSelectData } = inject($selectData)!

  const { request } = inject($global)!

  const currentOptions = ref<Option[]>([])

  const loading = ref(false)

  const fetchData = debounce(async () => {
    if (!request) return
    if (!props.api) return

    const { url, method, params, data, dataPath } = props.api

    loading.value = true

    const res = await request({
      url,
      method,
      params,
      data
    })

    const resData = getDataByPath(res, dataPath) || []

    const resDataParse = resData.map((item: any) => {
      if (isPlainObject(item)) {
        return item
      }
      return { label: item, value: item }
    })

    currentOptions.value = [...currentOptions.value, ...resDataParse]

    loading.value = false
  }, 300)

  onMounted(() => {
    const { mode, options = [] } = props
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

  watch(
    () => props.options,
    (newVal = []) => {
      if (props.mode === 'static') {
        currentOptions.value = newVal
      }
    }
  )

  watch(
    () => props.mode,
    (newVal) => {
      if (newVal === 'static') {
        currentOptions.value = props.options || []
      }
      if (newVal === 'remote') {
        currentOptions.value = []
        fetchData()
      }
    }
  )

  const selectChange = (val: any) => {
    const { valueKey = 'value', multiple, name } = props

    let valueData = {}

    if (multiple && Array.isArray(val)) {
      //多选就过滤出vals对应的源数据
      valueData = currentOptions.value.filter((item) => {
        return val.includes(item[valueKey])
      })
    } else {
      //单选找到单项对应的源数据
      valueData = currentOptions.value.find((item) => item[valueKey] === val) || {}
    }

    //如果接到了selectData，给顶级组件保存当前值对应得数据源
    if (selectData && name) {
      updateSelectData(name, valueData)
    }
  }

  return { selectChange, currentOptions, loading, fetchData }
}

export default useSelect
