---
trigger: manual
---

# Vue Form Craft AI 架构文档

> 本文档专为 AI 快速理解项目架构而设计，字数控制在 10000-12000 字。

## 一、项目概览

**Vue Form Craft** 是基于 Vue 3 + TypeScript + Element Plus 的低代码表单解决方案。

### 核心特性

- 🎨 可视化设计器：拖拽式设计，实时预览
- 📋 JsonSchema 驱动：配置即代码
- 🔗 强大联动：JS 表达式 + 数据联动
- ✅ 完善校验：8 种校验类型
- 🧩 高扩展性：37+ 组件，支持自定义
- 🌐 国际化：中英文支持

### 技术栈

- Vue 3.5.8 + TypeScript 5.3
- Element Plus 2.11.4
- Vite 5.0 + Vitest 2.1
- lodash + vuedraggable-es-fix

### 目录结构

```
vue-form-craft/
├── form-craft/           # 核心库（npm 包）
│   ├── src/
│   │   ├── components/   # FormRender、FormDesign
│   │   ├── elements/     # 37 个表单元素
│   │   ├── config/       # 配置文件
│   │   ├── hooks/        # 组合式函数
│   │   ├── types/        # TS 类型
│   │   ├── utils/        # 工具函数
│   │   ├── templates/    # 表单模板
│   │   └── locales/      # 国际化
│   └── dist/
├── play/                 # 开发环境
└── docs/                 # 文档站点
```

---

## 二、核心架构

### 2.1 FormRender（表单渲染器）

**位置**：`form-craft/src/components/FormRender/index.vue`

**职责**：

1. 根据 JsonSchema 动态渲染表单
2. 管理表单数据（v-model）
3. 提供操作 API（校验、提交、重置）
4. 支持设计模式和只读模式

**核心实现**：

```typescript
// 数据模型
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

// 上下文（供表达式使用）
const context = computed(() => ({
  $values: formValues.value,
  $selectData: selectData,
  $locale: locale.value,
  ...props.schemaContext
}))

// 解析表达式（非设计模式）
const formItems = computed(() => {
  if (props.design) return props.schema.items
  return deepParse(props.schema.items || [], context.value)
})

// API
const instance = readonly({
  getValues: () => formValues.value,
  setValues: (values) => {
    formValues.value = values
  },
  getFieldValue: (path) => getDataByPath(formValues.value, path),
  setFieldValue: (path, value) => {
    formValues.value = setDataByPath(formValues.value, path, value)
  },
  validate: () => form.value!.validate(),
  resetFields: (names) => form.value?.resetFields(names),
  submit: () => {
    /* 校验后触发 finish/failed */
  }
})

provide($formInstance, instance)
```

### 2.2 FormDesign（表单设计器）

**位置**：`form-craft/src/components/FormDesign/index.vue`

**职责**：

1. 可视化设计表单
2. 管理历史记录（撤销/重做）
3. 导出 JsonSchema 和 Vue 代码

**三大区域**：

- **SideBar**：组件菜单
- **Main**：画布 + 属性面板
- **Json**：代码预览

**历史记录**：

```typescript
// 防抖避免拖拽时多次触发
const recordHistory = debounce(async (schema: FormSchema) => {
  if (historyIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, historyIndex.value + 1)
  }
  history.value.push(cloneDeep(schema))
  historyIndex.value = history.value.length - 1
}, 100)

// 撤销
const handleHistoryBack = () => {
  if (historyIndex.value > -1) {
    historyIndex.value--
    const newSchema = history.value[historyIndex.value] || initJsonSchema
    setSchema(cloneDeep(newSchema))
  }
}
```

**重要**：外部修改 schema 应通过 `ref.updateSchema()` 而非直接修改 v-model。

---

## 三、JsonSchema 协议

### 3.1 表单全局配置

```typescript
interface FormSchema {
  labelWidth?: number // label 宽度，默认 150
  labelAlign?: 'left' | 'top' | 'right' // 对齐，默认 'right'
  labelSuffix?: string // 后缀，默认 '-'
  labelBold?: boolean // 加粗
  size?: 'small' | 'default' | 'large' // 大小
  disabled?: boolean // 全局禁用
  hideRequiredAsterisk?: boolean // 隐藏必填星号
  scrollToError?: boolean // 滚动到错误
  submitBtn?: boolean // 提交按钮
  resetBtn?: boolean // 重置按钮
  initialValues?: Record // 初始值
  items?: FormItemType[] // 表单项
}
```

### 3.2 表单项配置

```typescript
interface FormItemType {
  label?: string // 标签
  name: string // 字段名（必填）
  component: string // 组件类型
  props?: Record // 组件 props
  required?: boolean // 必填
  initialValue?: any // 初始值
  help?: string // 提示
  hidden?: boolean | string // 隐藏（支持表达式）
  hideLabel?: boolean // 隐藏标签
  rules?: FormRules // 校验规则
  children?: FormItemType[] // 子项
  change?: FormChange[] // 联动
  designKey?: string // 设计器标识
  dialog?: boolean // 弹窗展示
}
```

### 3.3 示例

```json
{
  "labelWidth": 150,
  "items": [
    {
      "label": "用户名",
      "component": "Input",
      "name": "username",
      "required": true,
      "props": { "placeholder": "请输入" },
      "designKey": "design-a29l"
    }
  ]
}
```

---

## 四、表单元素系统

### 4.1 元素定义

```typescript
// elements/Input/index.ts
export default {
  title: '单行文本',
  component: 'Input',
  icon: h(Icon, { name: 'input' }),
  type: 'basic',
  order: 1,
  render: Input,
  modelName: 'modelValue',
  attrSchema: {...}
} satisfies FormElement
```

### 4.2 37 个元素分类

**基础（basic）**：
Input、TextArea、Password、InputNumber、Select、Radio、Checkbox、Switch、Rate、Slider、DatePicker、ColorPicker、Cascader、Autocomplete、SelectInput、VerifyCode

**高级（high）**：
FormList、Upload、Esign、Markdown

**布局（layout）**：
Grid、Inline、Card、Tabs、TabPane、Collapse、CollapseItem、ObjGroup

**辅助（assist）**：
Divider、Title、Text、Alert、Tag、Custom、JsonEdit、ColorInput

### 4.3 注册流程

```typescript
// 1. 定义元素
export default { title: '单行文本', component: 'Input', ... }

// 2. 导出
export { default as Input } from './Input'

// 3. 安装时注册
app.provide($globals, {
  elements: { ...elements, ...options.extendElements }
})

// 4. 使用
const elements = useElements()
const config = computed(() => elements[props.component])
```

---

## 五、联动系统

### 5.1 JS 表达式联动

**语法**：`{{ JS表达式 }}`

**场景**：动态计算属性（hidden、disabled、placeholder）

**上下文变量**：

- `$values`：表单数据
- `$selectData`：下拉框选中数据
- `$locale`：国际化
- `$item`：FormList 当前项
- `$index`：FormList 索引

**示例**：

```json
{
  "label": "简介",
  "component": "TextArea",
  "name": "desc",
  "props": {
    "placeholder": "{{ $values.name ? $values.name + '的简介' : '请输入' }}",
    "disabled": "{{ !$values.name }}"
  },
  "hidden": "{{ $values.type !== 'person' }}"
}
```

**实现**：

```typescript
// utils/deepParse.ts
const templateParse = (str: string, context: Record<string, any>) => {
  const template = str.match(/{{(.+?)}}/)
  if (template) {
    const parse = new Function(Object.keys(context).join(','), 'return ' + template[1])
    return parse(...Object.values(context))
  }
  return str
}
```

### 5.2 数据联动（change）

**场景**：字段值变化时修改其他字段

**格式**：

```typescript
interface FormChange {
  target: string // 目标字段
  value?: any // 修改值（支持表达式）
  condition?: any // 触发条件
}
```

**示例 1：基础**

```json
{
  "label": "单价",
  "name": "price",
  "change": [
    {
      "target": "total",
      "value": "{{ $values.price * $values.quantity }}"
    }
  ]
}
```

**示例 2：FormList 批量**

```json
{
  "label": "全选",
  "name": "selectAll",
  "change": [
    {
      "target": "list.*.checked",
      "value": "{{ $values.selectAll }}"
    }
  ]
}
```

**实现**：

```typescript
// FormItem.vue
watch(value, (newVal, oldVal) => {
  const change = props.change
  if (!change || isEqual(newVal, oldVal)) return

  let temp = cloneDeep(formInstance.getValues())

  change.forEach(({ target, value, condition }) => {
    if (condition === false) return

    // FormList 特殊处理
    if (target.includes('.*.')) {
      const [targetParse, listTarget] = target.split('.*.')
      const list = getDataByPath(temp, targetParse)
      if (Array.isArray(list)) {
        temp = setDataByPath(
          temp,
          targetParse,
          list.map((item) => ({ ...item, [listTarget]: value }))
        )
      }
      return
    }

    temp = setDataByPath(temp, target, value)
  })

  formInstance.setValues(temp)
})
```

---

## 六、校验系统

### 6.1 8 种校验类型

```typescript
type RuleType = 'required' | 'min' | 'max' | 'pattern' | 'builtin' | 'enum' | 'custom' | 'jsExpr'

interface RuleItem {
  type?: RuleType
  value?: any
  message?: string
  trigger?: 'blur' | 'change' | ['blur', 'change']
  expr?: string // 兼容旧格式
}
```

### 6.2 类型详解

**1. required**

```json
{ "type": "required", "message": "必填" }
```

**2. min/max**

```json
{ "type": "min", "value": 6, "message": "至少6位" }
{ "type": "max", "value": 20, "message": "最多20位" }
```

**3. pattern**

```json
{ "type": "pattern", "value": "^1[3-9]\\d{9}$", "message": "手机号格式错误" }
```

**4. builtin**

```json
{ "type": "builtin", "value": "email", "message": "邮箱格式错误" }
```

支持：string、number、email、url、date 等

**5. enum**

```json
{ "type": "enum", "value": ["admin", "user"], "message": "只能选择 admin 或 user" }
```

**6. custom**

```json
{
  "type": "custom",
  "value": "if (value.length < 6) { callback(new Error('长度不足')); } else { callback(); }"
}
```

**7. jsExpr**

```json
{
  "type": "jsExpr",
  "value": "{{ $values.password === $values.confirmPassword }}",
  "message": "两次密码不一致"
}
```

### 6.3 解析实现

```typescript
// utils/parseRules.ts
export function parseRules(rules?: RuleItem[]): FormItemRule[] {
  return rules.map((rule) => {
    const { type, value, message, trigger = ['blur', 'change'] } = rule
    const baseRule = { message, trigger }

    switch (type) {
      case 'required':
        return { ...baseRule, required: true }
      case 'min':
        return { ...baseRule, min: value }
      case 'max':
        return { ...baseRule, max: value }
      case 'pattern':
        return { ...baseRule, pattern: new RegExp(value) }
      case 'builtin':
        return { ...baseRule, type: value }
      case 'enum':
        return { ...baseRule, enum: value }
      case 'custom':
        return { ...baseRule, validator: new Function('rule', 'value', 'callback', value) }
      case 'jsExpr':
        return {
          ...baseRule,
          validator: async () => {
            if (!value) throw new Error(message)
          }
        }
    }
  })
}
```

---

## 七、核心工具函数

### 7.1 数据路径操作

**getDataByPath**

```typescript
// 支持 'user.name' 和 'list[0].name'
const getDataByPath = (obj: Record<string, any>, path: string) => {
  const keys = path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter((k) => k)
  let result = obj
  for (const key of keys) {
    const index = Number(key)
    if (!isNaN(index) && Array.isArray(result)) {
      result = result[index]
    } else if (key in result) {
      result = result[key]
    } else {
      return undefined
    }
  }
  return result
}
```

**setDataByPath**

```typescript
// 返回新对象，避免直接修改
const setDataByPath = (object: Record<string, any>, path: string, value: any) => {
  const cloneObj = cloneDeep(object)
  const pathArray = path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter((k) => k)

  function update(obj, pathArray, value) {
    if (pathArray.length === 1) {
      obj[pathArray[0]] = value
      return
    }
    const currentKey = pathArray[0]
    if (!obj[currentKey]) {
      obj[currentKey] = !isNaN(Number(pathArray[1])) ? [] : {}
    }
    update(obj[currentKey], pathArray.slice(1), value)
  }

  update(cloneObj, pathArray, value)
  return cloneObj
}
```

### 7.2 表达式解析

```typescript
// utils/deepParse.ts
const deepParse = (prop: any, context: Record<string, any>): any => {
  if (isString(prop)) return templateParse(prop, context)
  if (isPlainObject(prop)) {
    return Object.keys(prop).reduce(
      (all, key) => ({
        ...all,
        [key]: deepParse(prop[key], context)
      }),
      {}
    )
  }
  if (isArray(prop)) return prop.map((item) => deepParse(item, context))
  return prop
}
```

### 7.3 设计器工具

```typescript
// utils/designUtils.ts
generateDesignKey() // 'design-xxxx'
generateName() // 'form-xxxx'
repirJsonSchema(schema) // 修复 schema
copyItems(list, designKey) // 复制表单项
recursionDelete(list, fn) // 递归删除
removeDesignKeys(obj) // 移除 designKey
restoreDesignKeys(edited, original) // 恢复 designKey
```

---

## 八、依赖注入系统

### 8.1 Symbol 定义

```typescript
// symbol.ts
export const $globals = Symbol() as InjectionKey<Globals>
export const $formInstance = Symbol() as InjectionKey<DeepReadonly<FormInstance>>
export const $designInstance = Symbol() as InjectionKey<Reactive<DesignInstance>>
```

### 8.2 注入层级

```
App (install.ts)
  ↓ provide $globals
FormRender
  ↓ provide $formInstance
FormItem
  ↓ inject $formInstance

FormDesign
  ↓ provide $designInstance
CanvasItem / AttrPanel
  ↓ inject $designInstance
```

### 8.3 使用

```typescript
// hook
```
