import { $designInstance } from '@/config'
import { inject } from 'vue'

// 返回一个响应式的Proxy，所以不可解构使用
const useDesignInstance = () => {
  const instance = inject($designInstance)!

  return instance
}

export default useDesignInstance
