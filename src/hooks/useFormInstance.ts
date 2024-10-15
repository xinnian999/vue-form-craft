import { $formInstance } from '@vue-form-craft/config/symbol'
import type { FormInstance } from '@vue-form-craft/release'
import { inject } from 'vue'

const useFormInstance = (): FormInstance => {
  const instance = inject($formInstance)!

  return instance
}

export default useFormInstance
