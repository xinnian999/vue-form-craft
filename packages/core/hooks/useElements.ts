import { $globals } from '@form-magic/core'
import type { FormElement } from '@form-magic/core'
import { inject } from 'vue'

const useElements = (): Record<string, FormElement> => {
  const globals = inject($globals)!

  return globals.elements
}

export default useElements
