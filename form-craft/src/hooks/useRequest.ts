import { useGlobals } from '@/hooks'

const useRequest = () => {
  const { request } = useGlobals()

  return request
}

export default useRequest
