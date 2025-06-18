import { $elements, $options } from '@form-magic/core'
import type { FormElement } from '@form-magic/core'
import { inject } from 'vue'

const useElements = (): Record<string, FormElement> => {
  const options = inject($options)!

  const elements = inject($elements)!

  const FormElements = {...elements}

  if (options?.extendElements) {
    Object.assign(FormElements, options.extendElements)
  }

  return FormElements
}

export default useElements
