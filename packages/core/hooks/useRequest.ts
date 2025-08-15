import { $globals } from '@magic-form/core'
import { inject } from 'vue'

const useRequest = () => {
  const { request } = inject($globals)!

  return request
}

export default useRequest
