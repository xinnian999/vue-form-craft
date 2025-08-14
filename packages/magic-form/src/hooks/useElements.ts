import { $options } from '@magic-form/core'
import * as elements from '@/elements'
import type { FormElement } from '@magic-form/core'
import { inject } from 'vue'

const useElements = (): Record<string, FormElement> => {
  const options = inject($options)!

  const FormElements = {...elements}

  if (options?.extendElements) {
    Object.assign(FormElements, options.extendElements)
  }

  return FormElements
}

export default useElements
