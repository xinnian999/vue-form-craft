# Type Declarations

## FormRule

Validation rules for the `input` field.

```ts
export type TriggerType = 'blur' | 'change'

export type FormRule = {
  type: 'email' | 'url' | boolean | string
  message?: string
  trigger?: TriggerType | TriggerType[]
}
```

## FormChange

Value linkage for form fields.

```ts
type FormChange = {
  target: string // Target field
  value: any // New value
  condition?: any // Trigger condition
}
```

## FormItemType

Single form item in JsonSchema.

```ts
interface FormItemType {
  label?: string // Field label
  name: string // Unique field identifier
  component: string // Component to use
  componentProps?: object // Parameters passed to the component
  required?: boolean // Whether it is required
  initialValue?: any // Default value
  help?: string // Help information
  items?: FormItemType[] // Configuration for nested components
  hidden?: boolean | string // Whether it is hidden
  designKey?: string // Key used by the designer, automatically generated
  rules?: FormRule[] // Validation rules, specific to the input component
  class?: any // Field class
  style?: any // Field inline style
  design?: boolean // Design mode, used for extending components
  change?: FormChange[] // Value linkage configuration
  dialog?: boolean // Display component in a dialog
}
```

## FormSchema

Interface type for JsonSchema.

```ts
type FormSchema = {
  labelWidth?: number // Form label width
  labelAlign?: 'top' | 'left' | 'right' // Form label alignment
  size?: 'default' | 'small' | 'large' // Form component size
  disabled?: boolean // Disable all form items
  hideRequiredAsterisk?: boolean // Hide required asterisk
  items: FormItemType[] // Form item configuration
}
```

## FormElement

Component configuration for the form designer, used when extending the form designer.

```ts
type FormElement = {
  name: string // Component name
  component: VNode | Component // Vue SFC component that can accept v-model
  icon: VNode | Component // Component icon, SFC component
  type: 'assist' | 'layout' | 'basic' // Component type
  order: number // The designer will sort all components based on the order
  initialValues: Omit<FormItemType, 'name'> // Default configuration when dragging and dropping components
  modelName?: string // v-model name of the component, default is modelValue
  attrSchema: FormSchema // Component configuration form, schema
}
```

## TemplateData

Template data on the left side of the designer.

```ts
type TemplateData = { name: string; schema: FormSchema; id?: string }[]
```
