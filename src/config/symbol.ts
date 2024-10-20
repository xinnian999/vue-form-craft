import type { DeepReadonly, InjectionKey, Ref, UnwrapNestedRefs } from 'vue'
import type { FormItemType, FormInstance, FormSchema, Options } from './commonType'

export const $schema = Symbol() as InjectionKey<{
  readonly schema: Ref<FormSchema>
  updateSchema: (schema: FormSchema) => void
}>

export const $current = Symbol() as InjectionKey<{
  readonly current: Ref<FormItemType | null>
  updateCurrent: (current: FormItemType) => void
}>

export const $methods = Symbol() as InjectionKey<{
  onAdd: (params: Record<string, any>) => void
  handleDeleteItem: (element: FormItemType) => void
  handleCopyItem: (element: FormItemType) => void
  handleSave: () => void
}>

export const $hoverKey = Symbol() as InjectionKey<{
  readonly hoverKey: Ref<string>
  updateHoverKey: (key: string) => void
}>

export const $formInstance = Symbol() as InjectionKey<DeepReadonly<UnwrapNestedRefs<FormInstance>>>

export const $options = Symbol() as InjectionKey<Options>
