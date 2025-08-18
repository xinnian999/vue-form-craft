import type { Globals, Options } from '@form-magic/core'
import { ElMessage } from 'element-plus'
import * as elements from '@/elements'
import { FormItem } from '@/components'

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
