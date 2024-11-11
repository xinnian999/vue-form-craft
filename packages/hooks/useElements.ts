import { $options } from '@vue-form-craft/config/symbol'
import * as elements from '@vue-form-craft/elements'
import type { FormElement } from '@vue-form-craft/types'
import { inject } from 'vue'

const useElements = (): Record<string, FormElement> => {
  const options = inject($options)!

  const FormElements = elements

  if (options.extendElements) {
    Object.assign(FormElements, options.extendElements)
  }

  // if (opts?.eager) {
  //   return Object.entries(FormElements).reduce<UseElementRenders>((acc, [key, value]) => {
  //     acc[key] = value.render

  //     return acc
  //   }, {})
  // }

  return FormElements
}

export default useElements
