import { $request } from '@vue-form-craft/config/symbol'
import { inject } from 'vue'

const useRequest = () => {
  const request = inject($request, undefined)

  return request
}

export default useRequest
