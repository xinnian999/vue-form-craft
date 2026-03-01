import { inject } from 'vue'
import { $globals } from '@/symbol'

const useGlobals = () => {
  const globals = inject($globals)!

  return globals
}

export default useGlobals
