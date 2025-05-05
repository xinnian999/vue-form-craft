import { $options } from '@vue-form-craft/element-plus/config/symbol'
import * as elements from '@vue-form-craft/element-plus/elements'
import type { FormElement } from '@vue-form-craft/element-plus/types'
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
