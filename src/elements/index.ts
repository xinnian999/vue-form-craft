import type { FormElement } from '@vue-form-craft/config/commonType'

const modules = import.meta.glob('@vue-form-craft/elements/*/index.ts', { eager: true })

const elements: { [component: string]: FormElement } = {}

for (const path in modules) {
  const data = (modules[path] as { default: FormElement }).default

  if (data) {
    elements[data.initialValues.component] = data
  }
}

export default elements
