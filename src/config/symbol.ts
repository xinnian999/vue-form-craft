import type { InjectionKey, Ref } from 'vue'
import type { $Global, FormSchema } from './commonType'

export const $global = Symbol() as InjectionKey<$Global>

export const $schema = Symbol() as InjectionKey<{
  readonly schema: Ref<FormSchema>
  updateSchema: (schema: FormSchema) => void
}>

export const $formValues = Symbol() as InjectionKey<{
  readonly formValues: Record<string, any>
  updateFormValues: (values: Record<string, any>) => void
}>

export const $selectData = Symbol() as InjectionKey<{
  readonly selectData: Record<string, Record<string, any>>
  updateSelectData: (key:string, value: Record<string, any>) => void
}>

export const $initialValues = Symbol() as InjectionKey<{
  readonly initialValues: Record<string, Record<string, any>>
  updateInitialValues: (values: Record<string, any>) => void
}>

export const $current = Symbol()
export const $methods = Symbol()
export const $hoverKey = Symbol()
