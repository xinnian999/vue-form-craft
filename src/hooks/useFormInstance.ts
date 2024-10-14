import { $formInstance } from '@vue-form-craft/config/symbol'
import type { FormInstance } from '@vue-form-craft/release'
import { inject, reactive, readonly } from 'vue'

const useFormInstance = (): FormInstance => {
  const instance = inject($formInstance)!

  // 增添只读保护
  const readonlyInstance = readonly(instance)

  // 用reactive包裹，实现ref解包
  const reactiveInstance = reactive(readonlyInstance)

  return reactiveInstance
}

export default useFormInstance
