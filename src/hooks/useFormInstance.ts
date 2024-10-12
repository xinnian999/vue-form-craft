import { $formInstance } from '@vue-form-craft/config/symbol'
import { inject } from 'vue'

const useFormInstance = () => {
  return inject($formInstance)!
}

export default useFormInstance
