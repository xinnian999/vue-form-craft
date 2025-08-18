import { inject } from 'vue'
import { $globals } from '@form-magic/core'

const useGlobals = () => {
  const globals = inject($globals)!

  return globals
}

export default useGlobals
