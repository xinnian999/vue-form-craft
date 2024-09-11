# 类型声明

## FormRule

`input`输入框的校验规则

```ts
type FormRule = {
  type: 'email' | 'url' | 'custom' | string   //校验类型
  customReg?: string  // type为'custom'时，输入自定义正则
  message?: string   // 校验不通过的提示语
  trigger: 'blur' | 'change'   //校验时机
}
```

## FormChange

表单项的值联动

```ts
type FormChange = {
  target: string // 目标字段
  value: any // 新值
  condition?: any // 触发条件
}
```


## FormItemType

JsonSchema的单个表单项

```ts
interface FormItemType {
  label?: string // 字段标签
  name: string // 字段唯一标识
  component: string // 使用什么组件
  props?: object // 传给这个组件的参数
  required?: boolean // 是否必填
  initialValue?: any // 默认值
  help?: string // 提示信息
  children?: FormItemType[] // 子项配置，嵌套组件专用
  hidden?: boolean | string // 是否隐藏
  hideLabel?: boolean   // 隐藏标签
  designKey?: string    // 设计器用的key，会自动生成
  rules?: FormRule[]    // 校验规则，input组件专用
  class?: any   // 字段类名
  style?: any   // 字段行内样式
  design?: boolean  // 设计模式，扩展组件时用的
  change?: FormChange[] // 值联动配置
  dialog?: boolean  // 用弹窗展示组件
}
```

## FormSchema

JsonSchema的接口类型

```ts
type FormSchema = {
  labelWidth?: number // 表单标签宽度
  labelAlign?: 'top' | 'left' | 'right' // 表单的标签对齐方式
  size?: 'default' | 'small' | 'large' // 表单的组件大小
  disabled?: boolean // 禁用所有表单项
  hideRequiredAsterisk?: boolean // 隐藏必填星号
  labelBold?: boolean // 标签是否加粗
  items: FormItemType[] // 表单项配置
}
```

## FormElement

表单设计器的组件配置，为表单设计器扩展组件时使用

```ts
type FormElement = {
  name: string      // 组件的名字
  component: VNode | Component  // vue的SFC组件，需要可以接收v-model
  icon:  VNode | Component      // 组件的icon ， SFC组件
  type: 'assist' | 'layout' | 'basic'   // 组件类型
  order: number     // 设计器会按照order大小排序所有组件
  initialValues: Omit<FormItemType, 'name'>     // 拖拽生成组件时，生成的默认配置
  modelName?: string    // 组件的v-model名称，默认时modelValue
  attrSchema: FormSchema    // 组件的配置表单，schema
}
```

## TemplateData

设计器的左侧模版数据

```ts
type TemplateData = { name: string; schema: FormSchema; id?: string }[]
```