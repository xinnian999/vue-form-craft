import type { Component, VNode } from 'vue'

/**
 * Input 组件协议
 */
export interface InputProtocol {
  props: {
    modelValue: string | undefined
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    maxlength?: number
    showWordLimit?: boolean
    size?: 'large' | 'default' | 'small'
    'onUpdate:modelValue'?: (value: string) => void
    onBlur?: (e: Event) => void
    onFocus?: (e: Event) => void
    onChange?: (value: string) => void
    onInput?: (value: string) => void
    onClear?: () => void
  }
  slots: {
    prefix?: () => VNode
    suffix?: () => VNode
    prepend?: () => VNode
    append?: () => VNode
  }
}

/**
 * Textarea 组件协议
 */
export interface TextareaProtocol {
  props: {
    modelValue: string | undefined
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    maxlength?: number
    showWordLimit?: boolean
    autosize?: boolean | { minRows?: number; maxRows?: number }
    size?: 'large' | 'default' | 'small'
    'onUpdate:modelValue'?: (value: string) => void
    onBlur?: (e: Event) => void
    onFocus?: (e: Event) => void
    onChange?: (value: string) => void
    onInput?: (value: string) => void
    onClear?: () => void
  }
  slots: Record<string, never>
}

/**
 * Card 组件协议
 */
export interface CardProtocol {
  props: {
    header?: string
    shadow?: 'always' | 'hover' | 'never'
    bodyStyle?: Record<string, any>
  }
  slots: {
    default?: () => VNode
    header?: () => VNode
  }
}

/**
 * Form 组件协议
 */
export interface FormProtocol {
  props: {
    model?: Record<string, any>
    rules?: Record<string, any>
    labelWidth?: string | number
    labelAlign?: 'left' | 'right' | 'top'
    inline?: boolean
    disabled?: boolean
    size?: 'large' | 'default' | 'small'
    validateOnRuleChange?: boolean
    hideRequiredAsterisk?: boolean
    scrollToError?: boolean
  }
  slots: {
    default?: () => VNode
  }
}

/**
 * FormItem 组件协议
 */
export interface FormItemProtocol {
  props: {
    prop?: string
    label?: string
    labelWidth?: string | number
    labelPosition?: 'left' | 'right' | 'top'
    required?: boolean
    rules?: any | any[]
    error?: string
    showMessage?: boolean
    size?: 'large' | 'default' | 'small'
  }
  slots: {
    default?: () => VNode
    label?: () => VNode
    error?: () => VNode
  }
}

/**
 * UI适配器 - 包含所有组件的适配器
 */
export interface UIAdapter {
  // 表单组件
  Input: Component<InputProtocol['props']>
  Textarea: Component<TextareaProtocol['props']>
  // 布局组件
  Card: Component<CardProtocol['props']>
  Form: Component<FormProtocol['props']>
  FormItem: Component<FormItemProtocol['props']>
}
