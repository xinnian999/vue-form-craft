import type { FormValidationResult } from 'element-plus'
import type { Component, Ref, Slots, ToRefs, VNode } from 'vue'

export type RuleType =
  | 'required'
  | 'min'
  | 'max'
  | 'pattern'
  | 'builtin'
  | 'enum'
  | 'custom'
  | 'jsExpr'

export type RuleItem = {
  type?: RuleType
  value?: any
  message?: string
  trigger?: 'blur' | 'change'
}

export type FormRules = RuleItem[]

export type FormLinkage = {
  target: string
  condition?: any
  type: 'attr' | 'data'
  value?: any
  path?: string
  customPath?: string
}

export interface FormItemType {
  label?: string
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  name: string
  component: string
  required?: boolean
  props?: Record<string, any>
  initialValue?: any
  help?: string
  children?: FormItemType[]
  hidden?: boolean | string
  hideLabel?: boolean
  designKey?: string
  rules?: FormRules
  class?: any
  style?: any
  linkages?: FormLinkage[]
  dialog?: boolean
  width?: number
}

export type FormSchema = {
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  labelSuffix?: string
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  hideRequiredAsterisk?: boolean
  labelBold?: boolean
  scrollToError?: boolean
  initialValues?: Record<string, any>
  items?: FormItemType[]
  style?: any
  submitBtn?: boolean
  resetBtn?: boolean
}

export type FormElement = {
  title: string
  component: string
  render: string | VNode | Component
  icon: string | VNode | Component
  type: 'assist' | 'layout' | 'basic' | 'high'
  order: number
  modelName?: string
  attrSchema: FormSchema
}

export type TemplateData = { name: string; schema: FormSchema; id?: string }[]

export type SchemaApi = {
  url: string
  method: 'GET' | 'POST'
  data?: Record<string, any>
  params?: Record<string, any>
  dataPath?: string
}

export type OptionType = 'circle' | 'border' | 'button'

export type Direction = 'horizontal' | 'vertical'

export interface SelectProps {
  options?: Record<string, any>[]
  multiple?: boolean
  mode?: string
  labelKey?: string
  valueKey?: string
  disabledKey?: string
  api?: SchemaApi
  name?: string
}

export type SelectValue = string | number | boolean

export type HistoryRecord = {
  schema: FormSchema
  description: string
  timestamp: number
}

export type Lang = Ref<'en' | 'zh'>

export type Locale = {
  menus: {
    basicTitle: string
    highTitle: string
    layoutTitle: string
    assistTitle: string
    useTemplateBtn: string
  }
  actions: {
    previewJson: string
    previewVueCode: string
    previewForm: string
    clear: string
    save: string
  }
  canvas: {
    emptyTip: string
    wrapperEmptyTip: string
  }
  attr: {
    tab1: {
      title: string
      emptyTip: string
      linkage: {
        text: string
        action1: string
        action2: string
      }
    }
    tab2: {
      title: string
    }
  }
}

// AI生成参数
export type AiGenerateParams = {
  prompt: string // 提示词
  context?: Record<string, any> // 上下文数据
  signal?: AbortSignal // 取消信号
}

// AI接口函数类型
export type AiGenerateFunction = (params: AiGenerateParams) => Promise<any>

export type Options = {
  request?: (options: Record<string, any>) => Promise<Record<string, any>>
  extendElements?: Record<string, FormElement>
  lang?: 'zh' | 'en'
  ai?: AiGenerateFunction // 改为函数类型
}

export interface Globals extends Options {
  elements: Record<string, FormElement>
}

export interface FormRenderProps {
  schema: FormSchema
  schemaContext?: Record<string, any>
  design?: boolean
  read?: boolean
}

export interface FormRenderEmits {
  finish: [values: Record<string, any>]
  failed: [
    errors: {
      message?: string
      fieldValue?: any
      field?: string
    }[]
  ]
  reset: []
  fieldChange: [path: string, value: any]
}

export interface FormInstance extends FormRenderProps {
  selectData: Record<string, Record<string, any>>
  context: Record<string, any>
  getValues: () => Record<string, any>
  setValues: (values: Record<string, any>) => void
  getFieldValue: (path: string) => any
  setFieldValue: (path: string, value: any) => void
  updateSelectData: (key: string, value: Record<string, any>) => void
  setFieldAttr: (name: string, path: string, value: any) => void
  validate: () => FormValidationResult | undefined
  resetFields: (names?: string[]) => void
  submit: () => void
}

export interface FormDesignProps {
  schemaContext?: Record<string, any>
  templates?: TemplateData
  omitMenus?: string[]
}

export interface DesignInstance extends Required<ToRefs<FormDesignProps>> {
  currentKey: Ref<string>
  hoverKey: string
  fullScreen: Ref<boolean>
  history: Ref<HistoryRecord[]>
  historyIndex: Ref<number>
  getSchema: () => FormSchema
  setSchema: (schema: FormSchema) => void
  setCurrentKey: (key: string) => void
  setHoverKey: (key: string) => void
  handleClear: () => void
  handleEmit: (event: any, ...args: any[]) => void
  handleHistoryBack: () => void
  handleHistoryForward: () => void
  handleToggleFullScreen: () => void
  getNodeByKey: (key: string) => FormItemType | null
  handleJson: (target?: string) => void
  addItem: (item: FormItemType) => void
  recordHistory: (description?: string) => void
}
