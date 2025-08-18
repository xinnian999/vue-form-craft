import { useGlobals } from '@form-magic/core'

const useRequest = () => {
  const { request } = useGlobals()

  return request
}

export default useRequest
