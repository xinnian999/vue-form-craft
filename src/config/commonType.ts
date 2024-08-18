import type { Component, VNode } from 'vue'

type anyObject = { [key: string]: any }

type formValuesType = anyObject

type contextType = {
  $values: formValuesType
  $selectData: formValuesType
  $initialValues: formValuesType
  [key: string]: any
}

type changeItemType = {
  target: string
  value: any
  condition?: any
}

interface formItemType {
  label?: string
  name: string
  component: string
  required?: boolean
  props?: object
  initialValue?: any
  help?: string
  children?: formItemType[]
  hidden?: boolean | string
  hideLabel?: boolean
  designKey?: string
  rules?: any[]
  class?: any
  style?: any
  design?: boolean
  change?: changeItemType[]
}

type formItemsType = formItemType[]

type schemaType = {
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  hideRequiredAsterisk?: boolean
  labelBold?: boolean
  items: formItemsType
}

type formElement = {
  name: string
  component: VNode
  icon: string | VNode
  type: 'assist' | 'layout' | 'basic' | 'high'
  order: number
  attr?: formItemsType
  initialValues: formItemType
  modelName?: string
  attrSchema: schemaType
}

type iconSelectConfigType = { component?: any; propKey?: string; iconList?: string[] }

type $globalType = {
  request?: any
  getSchema?: (schemaId: string) => Promise<schemaType>
  elements?: { [key: string]: formElement }
  iconSelectConfig?: iconSelectConfigType
  customElements?: { [key: string]: formElement }
}

type templateDataType = { name: string; schema: schemaType; id?: string }[]

type SchemaApi = {
  url: string
  method: 'GET' | 'POST'
  data?: Record<string, any>
  params?: Record<string, any>
  dataPath?: string
}

export type {
  anyObject,
  schemaType,
  formValuesType,
  contextType,
  formItemType,
  formItemsType,
  formElement,
  changeItemType,
  $globalType,
  iconSelectConfigType,
  templateDataType,
  SchemaApi
}
