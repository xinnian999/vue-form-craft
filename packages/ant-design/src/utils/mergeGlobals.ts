import type { Options } from '@form-magic/core'
import { ElMessage } from 'element-plus'
import * as elements from '@/elements'

const mergeGlobals = (options: Options) => {
  return {
    ...options,
    elements: {
      ...elements,
      ...options.extendElements
    },
    message: {
      success: (message: string) => {
        ElMessage.success(message)
      }
    }
  }
}

export default mergeGlobals
