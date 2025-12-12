import type { Component, VNode } from 'vue'

/**
 * UI适配器 - 包含所有组件的适配器
 */
export interface UIAdapter {
  // UI 相关样式变量注入
  injectCssVars?: () => void
  // 表单组件
  Form: Component<FormProtocol['props']>
  FormItem: Component<FormItemProtocol['props']>
  Input: Component<InputProtocol['props']>
  Textarea: Component<TextareaProtocol['props']>
  Select: Component<SelectProtocol['props']>
  RadioGroup: Component<RadioGroupProtocol['props']>
  CheckboxGroup: Component<CheckboxGroupProtocol['props']>
  Switch: Component<SwitchProtocol['props']>
  InputNumber: Component<InputNumberProtocol['props']>
  Slider: Component<SliderProtocol['props']>
  Rate: Component<RateProtocol['props']>
  ColorPicker: Component<ColorPickerProtocol['props']>
  DatePicker: Component<DatePickerProtocol['props']>
  // 布局组件
  Card: Component<CardProtocol['props']>
  Divider: Component<DividerProtocol['props']>
  Tabs: Component<TabsProtocol['props']>
  TabPane: Component<TabPaneProtocol['props']>
  Collapse: Component<CollapseProtocol['props']>
  CollapseItem: Component<CollapseItemProtocol['props']>
  // 工具组件
  Button: Component<ButtonProtocol['props']>
  Modal: Component<ModalProtocol['props']>
  Alert: Component<AlertProtocol['props']>
  // 消息组件
  Message: MessageProtocol
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
    colon?: boolean
  }
  slots: {
    default?: () => VNode
  }
  expose: {
    validate: () => Promise<boolean>
    validateField: (props: string | string[]) => Promise<boolean>
    resetFields: (props?: string | string[]) => void
    scrollToField: (prop: string) => void
    clearValidate: (props?: string | string[]) => void
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
 * Alert 组件协议
 */
export interface AlertProtocol {
  props: {
    title?: string
    description?: string
    type?: 'success' | 'info' | 'warning' | 'error'
    closable?: boolean
    showIcon?: boolean
    onClose?: () => void
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
 * Divider 组件协议
 */
export interface DividerProtocol {
  props: {
    direction?: 'horizontal' | 'vertical'
    contentPosition?: 'left' | 'center' | 'right'
    borderStyle?: 'solid' | 'dashed' | 'dotted'
  }
  slots: {
    default?: () => VNode
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
 * Slider 组件协议
 */
export interface SliderProtocol {
  props: {
    modelValue: number | [number, number] | undefined
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    range?: boolean
    'onUpdate:modelValue'?: (value: number | [number, number]) => void
    onChange?: (value: number | [number, number]) => void
  }
  slots: Record<string, never>
}

/**
 * Rate 组件协议
 */
export interface RateProtocol {
  props: {
    modelValue: number | undefined
    max?: number
    disabled?: boolean
    allowHalf?: boolean
    showScore?: boolean
    showText?: boolean
    'onUpdate:modelValue'?: (value: number) => void
    onChange?: (value: number) => void
  }
  slots: Record<string, never>
}

/**
 * ColorPicker 组件协议
 */
export interface ColorPickerProtocol {
  props: {
    modelValue: string | undefined
    disabled?: boolean
    showAlpha?: boolean
    colorFormat?: 'hex' | 'rgb' | 'hsl' | 'hsv'
    'onUpdate:modelValue'?: (value: string) => void
    onChange?: (value: string) => void
    onActiveChange?: (value: string) => void
  }
  slots: Record<string, never>
}

/**
 * DatePicker 组件协议
 */
export interface DatePickerProtocol {
  props: {
    modelValue: string | Date | [string, string] | [Date, Date] | undefined
    type?:
      | 'date'
      | 'datetime'
      | 'year'
      | 'month'
      | 'week'
      | 'daterange'
      | 'monthrange'
      | 'datetimerange'
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    disabled?: boolean
    clearable?: boolean
    format?: string
    valueFormat?: string
    'onUpdate:modelValue'?: (value: string | Date | [string, string] | [Date, Date]) => void
    onChange?: (value: string | Date | [string, string] | [Date, Date]) => void
  }
  slots: Record<string, never>
}

/**
 * Message 协议 - 包含消息提示和确认框
 */
export interface MessageProtocol {
  success: (message: string, options?: MessageOptions) => void
  warning: (message: string, options?: MessageOptions) => void
  info: (message: string, options?: MessageOptions) => void
  error: (message: string | MessageOptions, options?: MessageOptions) => void
  confirm: (message: string, title?: string, options?: MessageBoxOptions) => Promise<void>
  alert: (message: string, title?: string, options?: MessageBoxOptions) => Promise<void>
}

/**
 * Message 选项
 */
export interface MessageOptions {
  message?: string
  duration?: number
  showClose?: boolean
  center?: boolean
  offset?: number
}

/**
 * MessageBox 选项
 */
export interface MessageBoxOptions {
  confirmButtonText?: string
  cancelButtonText?: string
  type?: 'success' | 'info' | 'warning' | 'error'
  showCancelButton?: boolean
  showConfirmButton?: boolean
  center?: boolean
}
