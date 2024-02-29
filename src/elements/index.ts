const modules = import.meta.glob('@/elements/*/index.js', { eager: true })

const elements: { [component: string]: formElement } = {}

for (const path in modules) {
  const data = (modules[path] as { default: formElement }).default

  if (data) {
    elements[data.initialValues.component] = data
  }
}

export default elements
