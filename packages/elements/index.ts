import type { FormElement } from '@vue-form-craft/types'

const modules = import.meta.glob('./*/index.ts', { eager: true })

const elements: { [component: string]: FormElement } = {}

for (const path in modules) {
  const data = (modules[path] as { default: FormElement }).default

  if (data) {
    elements[data.initialValues.component] = data
  }
}

export default elements
