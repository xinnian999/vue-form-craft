const modules = import.meta.glob('@/elements/*/index.js', { eager: true })

const elements = {}
for (const path in modules) {
  const data = modules[path].default

  if (data) {
    elements[data.initialValues.component] = data
  }
}

const handle = (customElements) => {
  const mergeElements = {}

  Object.entries(elements).forEach(([key, value]) => {
    const customData = customElements[key]
    if (customData) {
      return (mergeElements[key] = {
        ...value,
        component: customData.component,
        modelName: customData.modelName || 'modelValue',
        attr: customData.propAttrs
          ? value.attr.map((item) =>
              item.name === 'props'
                ? {
                    ...item,
                    children: [
                      {
                        component: 'Divider',
                        props: {
                          title: 'Props',
                          contentPosition: 'center'
                        },
                        name: 'VekeRi'
                      },
                      ...customData.propAttrs
                    ]
                  }
                : item
            )
          : value.attr
      })
    }

    return (mergeElements[key] = { ...value, modelName: 'modelValue' })
  })

  return mergeElements
}

export default handle
