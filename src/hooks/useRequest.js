import { ref, watch, inject } from 'vue'
import { isEqual, debounce, throttle } from 'lodash'
import { getDataByPath } from '@/utils'

const useRequest = ({ api, debounceTime, throttleTime }) => {
  const $request = inject('$request')

  const data = ref([])
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true

    const res = await $request(api)

    const resData = getDataByPath(res, api.dataPath)

    data.value = resData

    loading.value = false
  }

  const debounceRemote = debounce(fetchData, debounceTime)
  const throttleRemote = throttle(fetchData, throttleTime)

  const run = () => {
    if (debounceTime) {
      return debounceRemote()
    }
    if (throttleTime) {
      return throttleRemote()
    }

    return fetchData()
  }

  watch(
    () => api,
    (newVal, oldVal) => {
      if (!isEqual(newVal, oldVal)) {
        run()
      }
    }
  )

  return { data, loading }
}

export default useRequest
