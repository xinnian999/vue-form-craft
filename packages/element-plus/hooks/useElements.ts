import { $options } from '@/config/symbol'
import * as elements from '@/elements'
import type { FormElement } from '@/types/index'
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
