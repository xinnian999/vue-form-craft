import { $globals } from '@magic-form/core'
import type { FormElement } from '@magic-form/core'
import { inject } from 'vue'

const useElements = (): Record<string, FormElement> => {
  const globals = inject($globals)!

  return globals.elements
}

export default useElements
