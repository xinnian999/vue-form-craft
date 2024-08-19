import type { InjectionKey } from 'vue'
import type { $Global } from './commonType'

export const $global = Symbol() as InjectionKey<$Global>
export const $schema = Symbol()
export const $formValues = Symbol()
export const $selectData = Symbol() as InjectionKey<Record<string, any>>
export const $formEvents = Symbol()
export const $initialValues = Symbol()

export const $current = Symbol()
export const $methods = Symbol()
export const $hoverKey = Symbol()
