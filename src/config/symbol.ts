import type { DeepReadonly, InjectionKey, Ref } from 'vue'
import type { FormItemType, FormInstance, FormSchema, Options, DesignInstance } from './commonType'

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

export const $options = Symbol() as InjectionKey<Options>

export const $formInstance = Symbol() as InjectionKey<DeepReadonly<FormInstance>>
export const $designInstance = Symbol() as InjectionKey<DesignInstance>

