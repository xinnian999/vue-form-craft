import { $elements } from '@vue-form-craft/config/symbol'
import elements from '@vue-form-craft/elements'
import { inject } from 'vue'

const useElements = () => {
  const data = inject($elements, elements)

  return data
}

export default useElements
