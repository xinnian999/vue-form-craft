import type { Component, VNode } from 'vue'

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
    colon?: boolean
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
    labelAlign?: 'left' | 'right' | 'top'
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
 * Select 组件协议
 */
export interface SelectProtocol {
  props: {
    modelValue: any
    options?: Array<{ label: string; value: any; disabled?: boolean }>
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    multiple?: boolean
    filterable?: boolean
    size?: 'large' | 'default' | 'small'
    loading?: boolean
    'onUpdate:modelValue'?: (value: any) => void
    onChange?: (value: any) => void
    onClear?: () => void
    onBlur?: (e: Event) => void
    onFocus?: (e: Event) => void
  }
  slots: {
    prefix?: () => VNode
    empty?: () => VNode
  }
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
 * Button 组件协议
 */
export interface ButtonProtocol {
  props: {
    type?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'text'
    size?: 'large' | 'default' | 'small'
    disabled?: boolean
    loading?: boolean
    plain?: boolean
    round?: boolean
    circle?: boolean
    text?: boolean
    link?: boolean
    name?: string
    onClick?: (e: Event) => void
  }
  slots: {
    default?: () => VNode
    icon?: () => VNode
  }
}

/**
 * Modal 组件协议
 */
export interface ModalProtocol {
  props: {
    modelValue?: boolean
    title?: string
    width?: string | number
    fullscreen?: boolean
    top?: string
    modal?: boolean
    to?: string | HTMLElement // Modal 挂载位置，默认为 body
    lockScroll?: boolean
    closeOnClickModal?: boolean
    closeOnPressEscape?: boolean
    showClose?: boolean
    center?: boolean
    destroyOnClose?: boolean
    draggable?: boolean
    'onUpdate:modelValue'?: (value: boolean) => void
    onOpen?: () => void
    onOpened?: () => void
    onClose?: () => void
    onClosed?: () => void
  }
  slots: {
    default?: () => VNode
    header?: () => VNode
    footer?: () => VNode
  }
}

/**
 * Tabs 组件协议
 */
export interface TabsProtocol {
  props: {
    modelValue?: string | number
    type?: 'card' | 'border-card' | ''
    closable?: boolean
    addable?: boolean
    editable?: boolean
    tabPosition?: 'top' | 'right' | 'bottom' | 'left'
    stretch?: boolean
    'onUpdate:modelValue'?: (value: string | number) => void
    onTabClick?: (pane: any, event: Event) => void
    onTabChange?: (name: string | number) => void
    onTabRemove?: (name: string | number) => void
    onTabAdd?: () => void
  }
  slots: {
    default?: () => VNode
  }
}

/**
 * TabPane 组件协议
 */
export interface TabPaneProtocol {
  props: {
    label?: string
    name?: string | number
    disabled?: boolean
    closable?: boolean
    lazy?: boolean
  }
  slots: {
    default?: () => VNode
    label?: () => VNode
  }
}

/**
 * Collapse 组件协议
 */
export interface CollapseProtocol {
  props: {
    modelValue?: string | number | Array<string | number>
    accordion?: boolean
    'onUpdate:modelValue'?: (value: string | number | Array<string | number>) => void
    onChange?: (value: string | number | Array<string | number>) => void
  }
  slots: {
    default?: () => VNode
  }
}

/**
 * CollapseItem 组件协议
 */
export interface CollapseItemProtocol {
  props: {
    name?: string | number
    title?: string
    disabled?: boolean
  }
  slots: {
    default?: () => VNode
    title?: () => VNode
  }
}

/**
 * RadioGroup 组件协议
 */
export interface RadioGroupProtocol {
  props: {
    modelValue: any
    disabled?: boolean
    options?: Array<{ label: string; value: any; disabled?: boolean }>
    isButtonOption?: boolean
    'onUpdate:modelValue'?: (value: any) => void
    onChange?: (value: any) => void
  }
  slots: {
    default?: () => VNode
  }
}

/**
 * CheckboxGroup 组件协议
 */
export interface CheckboxGroupProtocol {
  props: {
    modelValue: any[]
    disabled?: boolean
    options?: Array<{ label: string; value: any; disabled?: boolean }>
    isButtonOption?: boolean
    'onUpdate:modelValue'?: (value: any[]) => void
    onChange?: (value: any[]) => void
  }
  slots: {
    default?: () => VNode
  }
}

/**
 * Switch 组件协议
 */
export interface SwitchProtocol {
  props: {
    modelValue: boolean
    disabled?: boolean
    loading?: boolean
    activeText?: string
    inactiveText?: string
    'onUpdate:modelValue'?: (value: boolean) => void
    onChange?: (value: boolean) => void
  }
  slots: Record<string, never>
}

/**
 * InputNumber 组件协议
 */
export interface InputNumberProtocol {
  props: {
    modelValue: number | undefined
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    'onUpdate:modelValue'?: (value: number | undefined) => void
    onChange?: (value: number | undefined) => void
    onBlur?: (e: Event) => void
    onFocus?: (e: Event) => void
  }
  slots: Record<string, never>
}

/**
 * UI适配器 - 包含所有组件的适配器
 */
export interface UIAdapter {
  // 表单组件
  Input: Component<InputProtocol['props']>
  Textarea: Component<TextareaProtocol['props']>
  Select: Component<SelectProtocol['props']>
  RadioGroup: Component<RadioGroupProtocol['props']>
  CheckboxGroup: Component<CheckboxGroupProtocol['props']>
  Switch: Component<SwitchProtocol['props']>
  InputNumber: Component<InputNumberProtocol['props']>
  // 布局组件
  Card: Component<CardProtocol['props']>
  Tabs: Component<TabsProtocol['props']>
  TabPane: Component<TabPaneProtocol['props']>
  Collapse: Component<CollapseProtocol['props']>
  CollapseItem: Component<CollapseItemProtocol['props']>
  Form: Component<FormProtocol['props']>
  FormItem: Component<FormItemProtocol['props']>
  // 工具组件
  Button: Component<ButtonProtocol['props']>
  Modal: Component<ModalProtocol['props']>
}
