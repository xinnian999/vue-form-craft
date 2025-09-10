import { FormItem } from '@/components'
import * as elements from '@/elements'
import { ElMessage } from 'element-plus'
import { commonElements } from '@vue-form-craft/core'
import type { Globals, Options } from '@vue-form-craft/core'

const mergeGlobals = (options: Options) => {
  return {
    ...options,
    elements: {
      ...elements,
      ...commonElements,
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
