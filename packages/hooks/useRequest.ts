import { $options } from '@vue-form-craft/config/symbol'
import { inject } from 'vue'

const useRequest = () => {
  const { request } = inject($options)!

  return request
}

export default useRequest
