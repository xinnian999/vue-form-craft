# 类型声明

## RuleItem / FormRules

字段校验规则类型。

```ts
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
```

## FormLinkage

表单项联动配置（值联动 / 属性联动）。

```ts
type FormLinkage = {
  target: string
  condition?: any
  type: 'attr' | 'data'
  value?: any
  path?: string
  customPath?: string
}
```

## FormItemType

JsonSchema 的单个表单项。

```ts
interface FormItemType {
  label?: string
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  name: string
  required?: boolean
  help?: string
  alert?: string
  items?: FormItemType[]
  when?: boolean | string
  show?: boolean | string
  rules?: FormRules
  class?: any
  style?: any
  linkages?: FormLinkage[]
  component: string
  componentProps?: Record<string, any>
  defaultValue?: any
  designKey?: string
}
```

## FormSchema

JsonSchema 的表单级配置。

```ts
type FormSchema = {
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
```

## FormElement

表单设计器的组件配置（扩展组件时使用）。

```ts
type FormElement = {
  title: string
  component: string
  render: string | VNode | Component
  icon: string | VNode | Component
  type: 'assist' | 'layout' | 'basic' | 'high'
  order: number
  modelName?: string
  attrSchema: FormSchema
}
```

## TemplateData

设计器的左侧模版数据

```ts
type TemplateData = { name: string; schema: FormSchema; id?: string }[]
```

## FormRenderProps

```ts
export interface FormRenderProps {
  schema: FormSchema
  schemaContext?: Record<string, any>
  design?: boolean
  read?: boolean
}
```

## FormRenderEmits

```ts
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
```

## FormInstance

表单实例（`FormRender` 暴露能力）。

```ts
interface FormInstance {
  getSchema: () => FormSchema
  getSchemaContext: () => Record<string, any> | undefined
  getDesign: () => boolean | undefined
  getRead: () => boolean | undefined
  getSelectData: () => Record<string, Record<string, any>>
  getContext: () => Record<string, any>
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
```
