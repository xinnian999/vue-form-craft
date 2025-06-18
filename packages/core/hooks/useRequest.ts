import { $options } from '@form-magic/core'
import { inject } from 'vue'

const useRequest = () => {
  const { request } = inject($options)!

  return request
}

export default useRequest
