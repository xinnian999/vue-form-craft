import type FormRender from '@/components/FormRender.vue'
import type { Component, VNode } from 'vue'

export type FormRule = {
  type: 'email' | 'url' | 'custom' | string
  customReg?: string
  message?: string
  trigger: 'blur' | 'change'
}

export type FormChange = {
  target: string
  value: any
  condition?: any
}

export interface FormItemType {
  label?: string
  name: string
  component: string
  required?: boolean
  props?: object
  initialValue?: any
  help?: string
  children?: FormItemType[]
  hidden?: boolean | string
  hideLabel?: boolean
  designKey?: string
  rules?: FormRule[]
  class?: any
  style?: any
  design?: boolean
  change?: FormChange[]
  dialog?: boolean
}

export type FormSchema = {
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  hideRequiredAsterisk?: boolean
  labelBold?: boolean
  items: FormItemType[]
}

export type FormElement = {
  name: string
  component: VNode | Component
  icon: string | VNode | Component
  type: 'assist' | 'layout' | 'basic'
  order: number
  initialValues: Omit<FormItemType, 'name'>
  modelName?: string
  attrSchema: FormSchema
}

export type $Global = {
  request?: any
  elements: { [key: string]: FormElement }
  customElements?: { [key: string]: FormElement }
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
  api?: SchemaApi
  name?: string
}

export type SelectValue = string | number | boolean

export type FormRenderInstance = InstanceType<typeof FormRender>
