import { useGlobals } from '@vue-form-craft/core'

const useRequest = () => {
  const { request } = useGlobals()

  return request
}

export default useRequest
