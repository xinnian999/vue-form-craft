import { $options } from '@/config/symbol'
import { inject } from 'vue'

const useRequest = () => {
  const { request } = inject($options)!

  return request
}

export default useRequest
