import { inject } from 'vue'
import { $globals } from '@vue-form-craft/core'

const useGlobals = () => {
  const globals = inject($globals)!

  return globals
}

export default useGlobals
