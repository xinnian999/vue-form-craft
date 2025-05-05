import { $options } from '@vue-form-craft/element-plus/config/symbol'
import { inject } from 'vue'

const useRequest = () => {
  const { request } = inject($options)!

  return request
}

export default useRequest
