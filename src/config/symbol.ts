import type { InjectionKey, Ref } from 'vue'
import type { FormItemType, FormInstance, FormSchema, FormElement } from './commonType'

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

export const $formInstance = Symbol() as InjectionKey<FormInstance>

export const $elements = Symbol() as InjectionKey<Record<string, FormElement>>

export const $request = Symbol() as InjectionKey<
  (options: Record<string, any>) => Promise<Record<string, any>>
>
