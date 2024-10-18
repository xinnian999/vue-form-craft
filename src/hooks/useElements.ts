import { $options } from '@vue-form-craft/config/symbol'
import elements from '@vue-form-craft/elements'
import { inject } from 'vue'

const useElements = () => {
  const options = inject($options)!

  const FormElements = elements

  if (options.extendElements) {
    Object.assign(FormElements, options.extendElements)
  }

  return FormElements
}

export default useElements
