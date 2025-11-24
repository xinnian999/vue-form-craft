import { computed } from 'vue'
import { useDesignInstance, useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

// 容器组件专用，提供双向绑定的children。
// 在设计器模式下，允许通过designKey修改children。
const useChildrenModel = (props: { children?: FormItemType[]; designKey?: string }) => {
  const formInstance = useFormInstance()

  const designInstance = useDesignInstance()

  const childrenModel = computed({
    get() {
      return props.children || []
    },
    set(value) {
      if (formInstance.design && props.designKey) {
        if (props.designKey === 'root') {
          designInstance!.updateNodeByKey('root', {
            items: value
          })
        } else {
          designInstance!.updateNodeByKey(props.designKey, {
            children: value
          })
        }
      }
    }
  })

  return childrenModel
}

export default useChildrenModel
