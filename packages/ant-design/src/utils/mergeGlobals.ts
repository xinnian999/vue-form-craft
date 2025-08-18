import { FormItem } from '@/components'
import * as elements from '@/elements'
import { ElMessage } from 'element-plus'
import type { Globals, Options } from '@form-magic/core'

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
    },
    FormItem
  } satisfies Globals
}

export default mergeGlobals
