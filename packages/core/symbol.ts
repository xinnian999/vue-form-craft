import type { DeepReadonly, InjectionKey, Reactive } from 'vue'
import type { FormInstance, Globals, DesignInstance } from '@vue-form-craft/core'

export const $globals = Symbol() as InjectionKey<Globals>

export const $formInstance = Symbol() as InjectionKey<DeepReadonly<FormInstance>>

export const $designInstance = Symbol() as InjectionKey<Reactive<DesignInstance>>