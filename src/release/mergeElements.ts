import elements from '@/elements'

const handle = (customElements: { [key: string]: formElement }) => {
  const mergeElements: { [key: string]: formElement } = {}

  Object.entries(elements).forEach(([key, value]) => {
    const customData = customElements[key]
    if (customData) {
      return (mergeElements[key] = {
        ...value,
        component: customData.component,
        modelName: customData.modelName || 'modelValue',
        attr: customData.attr || value.attr
      })
    }

    return (mergeElements[key] = { ...value, modelName: 'modelValue' })
  })

  return mergeElements
}

export default handle
