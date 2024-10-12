import type { InjectionKey, Ref } from 'vue'
import type { $Global, FormItemType, FormSchema, Locale } from './commonType'
import type { FormValidationResult } from 'element-plus'

export const $global = Symbol() as InjectionKey<$Global>

export const $schema = Symbol() as InjectionKey<{
  readonly schema: Ref<FormSchema>
  updateSchema: (schema: FormSchema) => void
}>

export const $initialValues = Symbol() as InjectionKey<{
  readonly initialValues: Record<string, Record<string, any>>
  updateInitialValues: (values: Record<string, any>) => void
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

export const $locale = Symbol() as InjectionKey<Ref<Locale>>

export const $formInstance = Symbol() as InjectionKey<{
  readonly formValues: Ref<Record<string, any>>
  readonly selectData: Record<string, Record<string, any>>
  readonly initialValues: Record<string, Record<string, any>>
  readonly schema: Ref<FormSchema>
  readonly read: Ref<boolean>
  updateFormValues: (values: Record<string, any>) => void
  updateSelectData: (key: string, value: Record<string, any>) => void
  updateInitialValues: (values: Record<string, any>) => void
  validate: () => FormValidationResult | undefined
  resetFields: (names: string[]) => void
}>
