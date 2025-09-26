import { inject, reactive } from 'vue'
import { $formInstance } from '@vue-form-craft/core'

// 返回一个响应式的Proxy，所以不可解构使用
const useFormInstance = () => {
  const mockInstance = reactive({
    schema: { items: [] },
    schemaContext: {},
    design: false,
    read: false,
    formValues: {},
    selectData: {},
    initialValues: {},
    context: {},
    updateFormValues: () => {},
    updateSelectData: () => {},
    updateInitialValues: () => {},
    validate: () => Promise.reject(),
    resetFields: () => {},
    submit: () => {}
  })

  const instance = inject($formInstance, mockInstance)

  return instance
}

export default useFormInstance
