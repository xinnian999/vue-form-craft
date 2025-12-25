import type { InjectionKey } from 'vue'
import type { DesignInstance, FormInstance, Globals } from '@/types'
import type { UIAdapter } from '@/types/uiAdapter'

export const $globals = Symbol() as InjectionKey<Globals>

export const $formInstance = Symbol() as InjectionKey<FormInstance>

export const $designInstance = Symbol() as InjectionKey<DesignInstance>

export const $uiAdapter = Symbol() as InjectionKey<UIAdapter>
