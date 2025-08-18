import { useGlobals } from '@form-magic/core'
import type { FormElement } from '@form-magic/core'

const useElements = (): Record<string, FormElement> => {
  const globals = useGlobals()

  return globals.elements
}

export default useElements
