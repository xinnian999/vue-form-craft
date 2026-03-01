import { useGlobals } from '@/hooks'
import type { FormElement } from '@/types'

const useElements = (): Record<string, FormElement> => {
  const globals = useGlobals()

  return globals.elements
}

export default useElements
