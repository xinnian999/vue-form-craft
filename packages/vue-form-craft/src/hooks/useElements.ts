import { useGlobals } from '@/hooks'
import type { FormElement } from '@vue-form-craft/core'

const useElements = (): Record<string, FormElement> => {
  const globals = useGlobals()

  return globals.elements
}

export default useElements
