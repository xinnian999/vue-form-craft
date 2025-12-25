import type { FormValidationResult } from 'element-plus'
import type { Component, VNode } from 'vue'
import type { UIAdapter } from './uiAdapter'

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
  // A. 表单项“通用语义配置”（跟 UI 库无关）
  label?: string
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  name: string
  required?: boolean
  help?: string
  alert?: string
  children?: FormItemType[]
  hidden?: boolean | string
  show?: boolean | string
  rules?: FormRules
  class?: any
  style?: any
  linkages?: FormLinkage[]

  // B. 渲染层（跟 UI 组件强相关）
  component: string
  props?: Record<string, any>

  // C. 组件内建默认值
  // 仅影响组件【显示层】的默认值：value === undefined/null 时用于渲染，不会自动 set 到 formValues。
  // 推荐用于【属性配置表单】展示组件内建默认值；业务表单的初始值请统一使用 FormSchema.initialValues。
  defaultValue?: any

  // D. 设计器内部用的
  designKey?: string
}

export type FormSchema = {
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  colon?: boolean
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  hideRequiredAsterisk?: boolean
  scrollToError?: boolean
  initialValues?: Record<string, any>
  items?: FormItemType[]
  style?: any
  styleBlock?: string
  formId?: string
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
  params?: Record<string, any> | string
  dataPath?: string
  labelKey?: string
  valueKey?: string
  disabledKey?: string
}

export type Direction = 'horizontal' | 'vertical'

export interface SelectProps {
  options?: { label: any; value: any; disabled?: boolean }[]
  multiple?: boolean
  mode?: 'static' | 'remote'
  api?: SchemaApi
  name?: string
}

export type SelectValue = string | number | boolean

export type HistoryRecord = {
  schema: FormSchema
  description: string
  timestamp: number
}

// AI生成参数
export type AiGenerateParams = {
  prompt: string // 提示词
  signal?: AbortSignal // 取消信号
}

// AI接口函数类型
export type AiGenerateFunction = (params: AiGenerateParams) => Promise<any>

export type Options = {
  request?: (config: {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    params?: Record<string, any>
    headers?: Record<string, string>
  }) => Promise<any>
  extendElements?: Record<string, FormElement>
  ai?: AiGenerateFunction // 改为函数类型
  ui?: UIAdapter // UI 适配器
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
  change: [values: Record<string, any>]
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

export interface FormInstance {
  // Props Getter 方法
  getSchema: () => FormSchema
  getSchemaContext: () => Record<string, any> | undefined
  getDesign: () => boolean | undefined
  getRead: () => boolean | undefined

  // State Getter 方法
  getSelectData: () => Record<string, Record<string, any>>
  getContext: () => Record<string, any>

  // API 方法
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

export interface DesignInstance {
  // Props Getter 方法
  getSchemaContext: () => Record<string, any>
  getTemplates: () => TemplateData | undefined
  getOmitMenus: () => string[]

  // State Getter 方法
  getCurrentKey: () => string
  getHoverKey: () => string
  getFullScreen: () => boolean
  getHistory: () => HistoryRecord[]
  getHistoryIndex: () => number
  getSchema: () => FormSchema

  // Setter 方法
  setSchema: (schema: FormSchema) => void
  setCurrentKey: (key: string) => void
  setHoverKey: (key: string) => void
  setHistoryIndex: (index: number) => void

  // 其他方法
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

export interface ComponentBaseProps {
  formItemProps: FormItemType
}
