import type { DeepReadonly, InjectionKey } from 'vue'
import type { FormInstance, Options, DesignInstance } from './commonType'

export const $options = Symbol() as InjectionKey<Options>

export const $formInstance = Symbol() as InjectionKey<DeepReadonly<FormInstance>>

export const $designInstance = Symbol() as InjectionKey<DesignInstance>

