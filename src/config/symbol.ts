import type { InjectionKey, ComputedRef, ModelRef } from 'vue'
import type { $Global, FormSchema } from './commonType'

export const $global = Symbol() as InjectionKey<$Global>
export const $schema = Symbol() as InjectionKey<{
  schema: ComputedRef<FormSchema> | ModelRef<FormSchema, string, FormSchema, FormSchema>
  updateSchema: (schema: FormSchema) => void
}>
export const $formValues = Symbol()
export const $selectData = Symbol() as InjectionKey<Record<string, any>>
export const $formEvents = Symbol()
export const $initialValues = Symbol()

export const $current = Symbol()
export const $methods = Symbol()
export const $hoverKey = Symbol()
