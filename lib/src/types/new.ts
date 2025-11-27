export type RuleType =
  | 'required'
  | 'min'
  | 'max'
  | 'pattern'
  | 'builtin'
  | 'enum'
  | 'custom'
  | 'jsExpr'

export type RuleItemBase = {
  message?: string
  trigger?: 'blur' | 'change'
}

export type BuiltinRule = RuleItemBase & {
  type: Exclude<RuleType, 'jsExpr' | 'custom'>
  value?: any
}

export type ExprRule = RuleItemBase & {
  type: 'jsExpr'
  expr: string
}

export type CustomRule = RuleItemBase & {
  type: 'custom'
  key: string
  params?: any
}

export type RuleItem = BuiltinRule | ExprRule | CustomRule

export type FormRules = RuleItem[]

export type LinkageCondition =
  | {
      mode: 'expr'
      expr: string
    }
  | {
      mode: 'compare'
      source: string
      op: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'includes'
      value: any
    }

export type FormLinkage = {
  target: string
  type: 'attr' | 'data'
  path?: string
  value?: any
  condition?: LinkageCondition
}

// 表单项 schema 抽象
export interface FormItemSchema {
  // FormItem 层配置（与具体 UI 库无关）
  label?: string
  labelWidth?: number | string
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  name: string
  required?: boolean
  help?: string
  alert?: string
  hidden?: boolean | string
  class?: any
  style?: any

  // 渲染组件标识
  component: string

  // 组件“领域级”属性（推荐，跨 UI 兼容，包含可识别字段与透传字段）
  componentProps?: Record<string, any>

  // 初始值 / 校验 / 联动
  initialValue?: any
  rules?: FormRules
  linkages?: FormLinkage[]

  // 设计器相关
  children?: FormItemSchema[]
  designKey?: string
}

export type FormSchema = {
  labelWidth?: number | string
  labelAlign?: 'top' | 'left' | 'right'
  labelSuffix?: string
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  hideRequiredAsterisk?: boolean
  scrollToError?: boolean
  initialValues?: Record<string, any>
  items?: FormItemSchema[]
  style?: any
  css?: string
  formId?: string
  submitBtn?: boolean
  resetBtn?: boolean

  // 预留全局联动/规则扩展
  globalLinkages?: FormLinkage[]
  globalRules?: FormRules
}
