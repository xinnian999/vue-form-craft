import { $formInstance } from '@/config'
import { inject, reactive } from 'vue'

// 返回一个响应式的Proxy，所以不可解构使用
const useFormInstance = () => {
  const mockInstance = reactive({
    schema: { items: [] },
    schemaContext: {},
    design: false,
    footer: false,
    read: false,
    formValues: {},
    selectData: {},
    initialValues: {},
    context: {},
    vCodePass: false,
    updateFormValues: () => {},
    updateSelectData: () => {},
    updateInitialValues: () => {},
    updateVCodePass: () => {},
    validate: () => Promise.reject(),
    resetFields: () => {},
    submit: () => {}
  })

  const instance = inject($formInstance, mockInstance)

  return instance
}

export default useFormInstance
