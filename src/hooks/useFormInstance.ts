import { $formInstance } from '@vue-form-craft/config/symbol'
import type { FormInstance } from '@vue-form-craft/release'
import { inject, reactive } from 'vue'

const useFormInstance = (): FormInstance => {
  const instance = inject($formInstance)!

  return reactive(instance)
}

export default useFormInstance
