import { inject } from 'vue'
import { $components } from '../config'

export default function useComponents() {
  const components = inject($components)!

  return components
}
