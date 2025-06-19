import type { DeepReadonly, InjectionKey, Reactive } from 'vue'
import type { FormInstance, Options, DesignInstance, FormElement } from '@form-magic/core'

export const $options = Symbol() as InjectionKey<Options>

// 不同组件库的表单组件
export const $elements = Symbol() as InjectionKey<Record<string, FormElement>>

// 不同组件库的其他组件
export const $components = Symbol() as InjectionKey<{
  successMessage: (msg: string) => void
}>

export const $formInstance = Symbol() as InjectionKey<DeepReadonly<FormInstance>>

export const $designInstance = Symbol() as InjectionKey<Reactive<DesignInstance>>
