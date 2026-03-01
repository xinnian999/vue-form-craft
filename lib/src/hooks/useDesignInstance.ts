import { inject } from 'vue'
import { $designInstance } from '@/symbol'

// 返回 DesignInstance 实例
// 注意：虽然当前实现使用箭头函数不依赖 this，但为了保持 API 一致性，建议不解构使用
const useDesignInstance = () => {
  const instance = inject($designInstance, null)

  return instance
}

export default useDesignInstance
