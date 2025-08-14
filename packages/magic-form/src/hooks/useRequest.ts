import { $options } from '@magic-form/core'
import { inject } from 'vue'

const useRequest = () => {
  const { request } = inject($options)!

  return request
}

export default useRequest
