import type { FormValidationResult } from 'element-plus'
import type { Component, Ref, ToRefs, VNode } from 'vue'

export type TriggerType = 'blur' | 'change'

export type FormRule = {
  expr: string
  message?: string
  trigger?: TriggerType | TriggerType[]
}

export type FormRules = FormRule[]

export type FormChange = {
  target: string
  value?: any
  condition?: any
}

export interface FormItemType {
  label?: string
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
  change?: FormChange[]
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
  items: FormItemType[]
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
  lbTitle?: boolean
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

export type Options = {
  request?: (options: Record<string, any>) => Promise<Record<string, any>>
  extendElements?: Record<string, FormElement>
  lang?: 'zh' | 'en'
  ai?: {
    token?: string
    baseURL?: string
  }
}

export interface Globals extends Options {
  elements: Record<string, FormElement>
  message: {
    success: (message: string) => void
  }
  FormItem: Component
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
}

export interface FormInstance extends FormRenderProps {
  formValues: Record<string, any>
  selectData: Record<string, Record<string, any>>
  initialValues: Record<string, Record<string, any>>
  context: Record<string, any>
  updateFormValues: (values: Record<string, any>) => void
  updateSelectData: (key: string, value: Record<string, any>) => void
  updateInitialValues: (values: Record<string, any>) => void
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
  schema: Ref<FormSchema>
  list: Ref<FormItemType[]>
  current: Ref<FormItemType | null>
  rightTab: 'attr' | 'form'
  updateCurrent: (current: FormItemType) => void
  updateHoverKey: (key: string) => void
  updateSchema: (schema: FormSchema) => void
  updateList: (newList: FormItemType[]) => void
  handleEmit: (event: any, ...args: any[]) => void
}
