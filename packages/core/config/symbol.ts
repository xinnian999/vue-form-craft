import type { DeepReadonly, InjectionKey, Reactive } from 'vue'
import type { FormInstance, Options, DesignInstance, FormElement } from '@form-magic/core'

export const $options = Symbol() as InjectionKey<Options>

export const $elements = Symbol() as InjectionKey<Record<string, FormElement>>

export const $formInstance = Symbol() as InjectionKey<DeepReadonly<FormInstance>>

export const $designInstance = Symbol() as InjectionKey<Reactive<DesignInstance>>
