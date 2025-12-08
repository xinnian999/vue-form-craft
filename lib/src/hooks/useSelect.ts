import { debounce, isEqual, isPlainObject } from 'lodash'
import { onMounted, ref, watch } from 'vue'
import type { SelectProps } from '@/types'
import { getDataByPath } from '@/utils'
import useFormInstance from './useFormInstance'
import useRequest from './useRequest'

type Option = { label: any; value: any; disabled?: boolean }

const useSelect = (props: SelectProps) => {
  const formInstance = useFormInstance()

  const request = useRequest()

  const currentOptions = ref<Option[]>([])

  const loading = ref(false)

  const fetchData = debounce(async () => {
    if (formInstance.design) return
    if (!request) return
    if (!props.api) return

    const {
      url = '/',
      method = 'GET',
      params,
      dataPath = 'data',
      labelKey = 'label',
      valueKey = 'value',
      disabledKey = 'disabled'
    } = props.api

    loading.value = true

    let parseParams: Record<string, any> | undefined

    if (typeof params === 'string') {
      try {
        parseParams = JSON.parse(params)
      } catch (error) {
        console.error('解析params失败', error)
      }
    } else {
      parseParams = params
    }

    try {
      const res = await request({
        url,
        method,
        params: parseParams
      })
      const resData = getDataByPath(res, dataPath) || []

      const resDataParse: Option[] = resData.map((item: any) => {
        if (!isPlainObject(item)) {
          return { label: item, value: item, disabled: false }
        }

        return {
          label: item[labelKey],
          value: item[valueKey],
          disabled: item[disabledKey]
        }
      })

      currentOptions.value = resDataParse
    } finally {
      loading.value = false
    }
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
    const { multiple, name } = props

    let valueData = {}

    if (multiple && Array.isArray(val)) {
      //多选就过滤出vals对应的源数据
      valueData = currentOptions.value.filter((item) => {
        return val.includes(item.value)
      })
    } else {
      //单选找到单项对应的源数据
      valueData = currentOptions.value.find((item) => item.value === val) || {}
    }

    //如果接到了selectData，给顶级组件保存当前值对应得数据源
    if (formInstance.selectData && name) {
      formInstance.updateSelectData(name, valueData)
    }
  }

  return { selectChange, currentOptions, loading, fetchData }
}

export default useSelect
