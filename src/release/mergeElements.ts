import type { FormElement } from '@/config/commonType'
import elements from '@/elements'

const handle = (customElements: { [key: string]: FormElement }) => {
  const mergeElements: { [key: string]: FormElement } = {}

  Object.entries(elements).forEach(([key, value]) => {
    const customData = customElements[key]
    if (customData) {
      return (mergeElements[key] = {
        ...value,
        component: customData.component,
        modelName: customData.modelName || 'modelValue',
      })
    }

    return (mergeElements[key] = { ...value, modelName: 'modelValue' })
  })

  return mergeElements
}

export default handle
