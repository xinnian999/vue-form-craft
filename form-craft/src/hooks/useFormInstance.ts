import { inject } from 'vue'
import { $formInstance } from '@/symbol'

// 返回一个响应式的Proxy，所以不可解构使用
const useFormInstance = () => {
  const instance = inject($formInstance)!

  return instance
}

export default useFormInstance
