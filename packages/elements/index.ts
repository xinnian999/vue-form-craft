import type { FormElement } from '@vue-form-craft/types'

const modules = import.meta.glob('./*/index.ts', { eager: true, import: 'default' })

const elements: { [component: string]: FormElement } = {}

for (const path in modules) {
  const data = modules[path] as FormElement

  if (data) {
    elements[data.initialValues.component] = data
  }
}

export default elements
