# Vue Form Craft AI 架构文档

> 本文档专为 AI 快速理解项目架构而设计，涵盖核心概念、数据流、组件系统和最佳实践。

---

## 一、项目概览

**Vue Form Craft** 是基于 Vue 3 + TypeScript + Element Plus 的低代码表单解决方案，通过 JsonSchema 驱动表单的设计和渲染。

### 1.1 核心特性

- 🎨 **可视化设计器**：拖拽式设计，实时预览，支持历史记录（撤销/重做）
- 📋 **JsonSchema 驱动**：配置即代码，所见即所得
- 🔗 **强大联动系统**：支持 JS 表达式联动、数据联动（linkages）、函数联动（事件系统）三种方式
- ✅ **完善校验系统**：8 种校验类型（required、min/max、pattern、builtin、enum、custom、jsExpr）
- 🧩 **高扩展性**：37+ 内置组件，支持自定义组件扩展
- 🌐 **国际化**：中英文支持
- 💡 **智能编辑器**：FunctionEditor 提供 Monaco Editor 智能提示，支持多行函数编辑

### 1.2 技术栈

- **核心框架**：Vue 3.5.8 + TypeScript 5.3
- **UI 组件库**：Element Plus 2.11.4
- **构建工具**：Vite 5.0
- **测试框架**：Vitest 2.1
- **工具库**：lodash、vuedraggable-es-fix
- **AI 能力**：支持用户自定义注入 AI 接口（可对接任意 AI 服务）

### 1.3 目录结构

```
vue-form-craft/
├── form-craft/              # 核心库（npm 包）
│   ├── src/
│   │   ├── components/      # FormRender、FormDesign 核心组件
│   │   ├── elements/        # 37 个表单元素
│   │   ├── config/          # 配置文件（初始 schema、选项配置等）
│   │   ├── hooks/           # 组合式函数（useFormInstance、useElements 等）
│   │   ├── types/           # TypeScript 类型定义
│   │   ├── utils/           # 工具函数（deepParse、dataPath 操作等）
│   │   ├── templates/       # 表单模板（登录、注册等 14 个模板）
│   │   ├── locales/         # 国际化文件
│   │   └── Icon/            # 图标组件
│   └── dist/                # 构建产物
├── play/                    # 开发环境
└── docs/                    # 文档站点（VitePress）
```

---

## 二、核心架构

### 2.1 两大核心组件

#### FormRender（表单渲染器）

**位置**：`form-craft/src/components/FormRender/index.vue`

**职责**：

1. 根据 JsonSchema 动态渲染表单
2. 管理表单数据（通过 v-model 双向绑定）
3. 提供表单操作 API（校验、提交、重置、字段操作）
4. 支持设计模式（design）和只读模式（read）

**核心实现**：

```typescript
// 数据模型（双向绑定）
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

// 上下文对象（供 JS 表达式使用）
const context = computed(() => ({
  $values: formValues.value, // 表单数据
  $selectData: selectData, // 下拉框选中的完整数据
  ...props.schemaContext // 外部传入的自定义上下文
}))

// 解析表达式（非设计模式下）
const formItems = computed(() => {
  if (props.design) return internalSchema.value.items
  return deepParse(internalSchema.value.items || [], context.value)
})

// 对外暴露的 API
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
    /* 校验后触发 finish/failed 事件 */
  },
  updateSelectData: (key, value) => {
    selectData[key] = value
  },
  updateItemSchemaByPath: (name, path, value) => {
    /* 动态修改 schema */
  }
})

// 通过依赖注入提供给子组件
provide($formInstance, instance)
```

#### FormDesign（表单设计器）

**位置**：`form-craft/src/components/FormDesign/index.vue`

**职责**：

1. 可视化设计表单（拖拽、配置）
2. 管理历史记录（撤销/重做）
3. 导出 JsonSchema 和 Vue 代码
4. 提供模板功能

**三大区域**：

- **SideBar**：组件菜单（基础、高级、布局、辅助四类）
- **Main**：画布区 + 属性面板
- **Json**：代码预览（JsonSchema、Vue 代码）

**历史记录机制**：

```typescript
// 防抖避免拖拽时多次触发
const recordHistory = debounce(async (schema: FormSchema) => {
  if (historyIndex.value < history.value.length - 1) {
    // 截断后续历史
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

**重要约定**：外部修改 schema 应通过 `ref.updateSchema()` 而非直接修改 v-model，以确保历史记录正确。

### 2.2 FormItem（表单项组件）

**位置**：`form-craft/src/components/FormItem.vue`

**职责**：

1. 渲染单个表单项
2. 处理联动逻辑（linkages）
3. 解析校验规则（rules）
4. 支持弹窗展示复杂组件

**核心逻辑**：

```typescript
// 双向绑定字段值
const value = computed({
  get() {
    return formInstance.getFieldValue(props.name)
  },
  set(val) {
    formInstance.setFieldValue(props.name, val)
  }
})

// 解析校验规则
const computeRules = computed(() => {
  const { rules, required } = props
  const allRules = required
    ? [{ type: 'required', message: '该字段是必填字段' }, ...(rules || [])]
    : rules || []
  return parseRules(allRules)
})

// 联动监听
watch(value, (newVal, oldVal) => {
  const linkages = props.linkages
  if (!linkages || isEqual(newVal, oldVal) || formInstance.design) return

  let temp = cloneDeep(formInstance.getValues())

  linkages.forEach(({ target, value, path, customPath, condition, type }) => {
    if (condition === false) return

    if (type === 'attr') {
      // 修改 schema 属性
      const actualPath = path === 'custom' ? customPath : path
      formInstance.updateItemSchemaByPath(target, actualPath, value)
    } else if (type === 'data') {
      // 修改数据
      if (target.includes('.*.')) {
        // FormList 批量处理
        const [targetParse, listTarget] = target.split('.*.')
        const list = getDataByPath(temp, targetParse)
        if (Array.isArray(list)) {
          temp = setDataByPath(
            temp,
            targetParse,
            list.map((item) => ({ ...item, [listTarget]: value }))
          )
        }
      } else {
        temp = setDataByPath(temp, target, value)
      }
    }
  })

  if (!isEqual(temp, formInstance.getValues())) {
    formInstance.setValues(temp)
  }
})
```

---

## 三、JsonSchema 协议

### 3.1 表单全局配置

```typescript
interface FormSchema {
  labelWidth?: number // label 宽度，默认 150
  labelAlign?: 'left' | 'top' | 'right' // 对齐方式，默认 'right'
  labelSuffix?: string // label 后缀，默认 '-'
  labelBold?: boolean // 是否加粗 label
  size?: 'small' | 'default' | 'large' // 表单项大小
  disabled?: boolean // 全局禁用
  hideRequiredAsterisk?: boolean // 隐藏必填星号
  scrollToError?: boolean // 滚动到错误字段
  submitBtn?: boolean // 显示提交按钮
  resetBtn?: boolean // 显示重置按钮
  initialValues?: Record<string, any> // 初始值
  items?: FormItemType[] // 表单项数组
}
```

### 3.2 表单项配置

```typescript
interface FormItemType {
  label?: string // 标签文本
  name: string // 字段名（必填，唯一标识）
  component: string // 组件类型（如 'Input'、'Select'）
  props?: Record<string, any> // 组件 props（透传给 Element Plus）
  required?: boolean // 是否必填
  initialValue?: any // 初始值
  help?: string // 提示信息
  hidden?: boolean | string // 是否隐藏（支持表达式）
  hideLabel?: boolean // 是否隐藏标签
  rules?: FormRules // 校验规则
  children?: FormItemType[] // 子表单项（用于布局组件）
  linkages?: FormLinkage[] // 联动配置
  designKey?: string // 设计器标识（自动生成）
  dialog?: boolean // 是否弹窗展示
  labelWidth?: number // 单独设置 label 宽度
  labelAlign?: 'top' | 'left' | 'right' // 单独设置对齐方式
  class?: any // 自定义类名
  style?: any // 自定义样式
}
```

### 3.3 示例

```json
{
  "labelWidth": 150,
  "labelAlign": "right",
  "size": "default",
  "items": [
    {
      "label": "用户名",
      "component": "Input",
      "name": "username",
      "required": true,
      "props": {
        "placeholder": "请输入用户名",
        "maxlength": 20
      },
      "designKey": "design-a29l"
    },
    {
      "label": "密码",
      "component": "Password",
      "name": "password",
      "required": true,
      "props": {
        "placeholder": "请输入密码",
        "showPassword": true
      },
      "rules": [
        {
          "type": "min",
          "value": 8,
          "message": "密码至少8位"
        }
      ],
      "designKey": "design-t10l"
    }
  ]
}
```

---

## 四、表单元素系统

### 4.1 元素定义规范

每个表单元素都遵循统一的定义格式：

```typescript
// elements/Input/index.ts
export default {
  title: '单行文本',              // 显示名称
  component: 'Input',             // 组件标识
  icon: h(Icon, { name: 'input' }), // 图标
  type: 'basic',                  // 类型：basic/high/layout/assist
  order: 1,                       // 排序
  render: Input,                  // 渲染组件
  modelName: 'modelValue',        // v-model 绑定的 prop 名
  attrSchema: {...}               // 属性配置 schema
} satisfies FormElement
```

### 4.2 37 个内置元素分类

#### 基础组件（basic）- 16 个

- **Input**：单行文本
- **TextArea**：多行文本
- **Password**：密码输入
- **InputNumber**：数字输入
- **Select**：下拉选择
- **Radio**：单选框
- **Checkbox**：多选框
- **Switch**：开关
- **Rate**：评分
- **Slider**：滑块
- **DatePicker**：日期选择
- **ColorPicker**：颜色选择
- **Cascader**：级联选择
- **Autocomplete**：自动补全
- **SelectInput**：可输入下拉框
- **VerifyCode**：验证码输入

#### 高级组件（high）- 4 个

- **FormList**：自增列表（支持 table/card/inline 三种模式）
- **Upload**：文件上传
- **Esign**：电子签名
- **Markdown**：Markdown 编辑器

#### 布局组件（layout）- 8 个

- **Grid**：栅格布局
- **Inline**：行内布局
- **Card**：卡片容器
- **Tabs**：标签页容器
- **TabPane**：标签页项
- **Collapse**：折叠面板
- **CollapseItem**：折叠面板项
- **ObjGroup**：对象分组

#### 辅助组件（assist）- 9 个

- **Divider**：分割线
- **Title**：标题
- **Text**：文本
- **Alert**：提示框
- **Tag**：标签
- **Custom**：自定义组件
- **JsonEdit**：JSON 编辑器
- **ColorInput**：颜色输入（带透明度）

### 4.3 元素注册流程

```typescript
// 1. 定义元素（elements/Input/index.ts）
export default {
  title: '单行文本',
  component: 'Input',
  render: Input,
  attrSchema: {...}
} satisfies FormElement

// 2. 导出（elements/index.ts）
export { default as Input } from './Input'

// 3. 安装时注册（install.ts）
app.provide($globals, {
  elements: {
    ...elements,
    ...options.extendElements  // 支持扩展自定义元素
  }
})

// 4. 使用（FormItem.vue）
const elements = useElements()
const config = computed(() => elements[props.component])
```

### 4.4 自定义元素扩展

```typescript
// 定义自定义元素
const MyCustomElement: FormElement = {
  title: '我的组件',
  component: 'MyCustom',
  icon: h(Icon, { name: 'custom' }),
  type: 'basic',
  order: 100,
  render: MyCustomComponent,
  modelName: 'modelValue',
  attrSchema: {
    labelWidth: 150,
    items: [
      {
        label: '配置项',
        name: 'props.someConfig',
        component: 'Input'
      }
    ]
  }
}

// 注册时扩展
app.use(VueFormCraft, {
  extendElements: {
    MyCustom: MyCustomElement
  }
})
```

---

## 五、联动系统

### 5.1 JS 表达式联动

**语法**：`{{ JS表达式 }}`

**适用场景**：动态计算属性值（hidden、disabled、placeholder、help 等）

**上下文变量**：

- `$values`：表单数据对象
- `$selectData`：下拉框选中的完整数据对象
- `$instance`：表单实例 API（可调用 getValues、setFieldValue、validate 等方法）
- `$locale`：国际化语言
- `$item`：FormList 当前项数据
- `$index`：FormList 当前索引

**示例 1：动态显示/隐藏**

```json
{
  "label": "简介",
  "component": "TextArea",
  "name": "desc",
  "hidden": "{{ $values.type !== 'person' }}",
  "props": {
    "placeholder": "{{ $values.name ? $values.name + '的简介' : '请输入简介' }}"
  }
}
```

**示例 2：动态禁用**

```json
{
  "label": "确认按钮",
  "component": "Switch",
  "name": "confirm",
  "props": {
    "disabled": "{{ !$values.agree }}"
  }
}
```

**实现原理**：

```typescript
// utils/deepParse.ts
const templateParse = (str: string, context: Record<string, any>) => {
  const template = str.match(/{{(.+?)}}/)
  if (template) {
    try {
      // 使用 Function 构造器动态执行表达式
      const parse = new Function(Object.keys(context).join(','), 'return ' + template[1])
      return parse(...Object.values(context))
    } catch (e) {
      return str
    }
  }
  return str
}

// 递归解析整个 schema
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

### 5.2 数据联动（linkages）

**适用场景**：字段值变化时修改其他字段的值或属性

**格式**：

```typescript
interface FormLinkage {
  target: string // 目标字段的 name
  condition?: any // 触发条件（支持表达式）
  type: 'attr' | 'data' // 联动类型
  value?: any // 修改的值（支持表达式）
  path?: string // 属性路径（type='attr' 时使用）
  customPath?: string // 自定义路径
}
```

**示例 1：数据联动（基础）**

```json
{
  "label": "单价",
  "name": "price",
  "component": "InputNumber",
  "linkages": [
    {
      "target": "total",
      "type": "data",
      "value": "{{ $values.price * $values.quantity }}"
    }
  ]
}
```

**示例 2：属性联动**

```json
{
  "label": "是否启用",
  "name": "enabled",
  "component": "Switch",
  "linkages": [
    {
      "target": "config",
      "type": "attr",
      "path": "hidden",
      "value": "{{ !$values.enabled }}"
    }
  ]
}
```

**示例 3：FormList 批量联动**

```json
{
  "label": "全选",
  "name": "selectAll",
  "component": "Switch",
  "linkages": [
    {
      "target": "list.*.checked",
      "type": "data",
      "value": "{{ $values.selectAll }}"
    }
  ]
}
```

### 5.3 函数联动（事件系统）

**适用场景**：通过事件处理器实现复杂的表单联动逻辑

**实现原理**：

1. 所有 `{{ }}` 包裹的内容都会被 `deepParse` 解析
2. 如果解析结果是函数，会自动包装并传入 `params` 对象
3. `params` 对象包含所有上下文变量和事件参数

**函数参数说明**：

```typescript
interface Params {
  $values: Record<string, any> // 表单数据对象
  $selectData: Record<string, any> // 选择数据对象
  $instance: FormInstance // 表单实例 API
  $item?: any // 当前项数据（在列表/自增容器中）
  $index?: number // 当前项索引（在列表/自增容器中）
  args: any[] // 原始事件参数数组，如 [event]
}
```

**支持的事件**：

- `onChange`：值改变时触发
- `onBlur`：失去焦点时触发
- `onFocus`：获得焦点时触发
- `onInput`：输入时触发
- `onClear`：点击清空按钮时触发
- 以及其他 Element Plus 组件支持的事件

**示例 1：基础事件处理**

```json
{
  "label": "用户名",
  "name": "username",
  "component": "Input",
  "props": {
    "placeholder": "请输入用户名",
    "onBlur": "{{ (params) => { console.log('失去焦点，当前值:', params.$values.username) } }}"
  }
}
```

**示例 2：访问事件对象**

```json
{
  "label": "手机号",
  "name": "phone",
  "component": "Input",
  "props": {
    "placeholder": "请输入手机号",
    "maxlength": 11,
    "onBlur": "{{ (params) => {
      const event = params.args[0]
      if (params.$values.phone?.length === 11) {
        params.$instance.setFieldValue('verified', true)
      }
    } }}"
  }
}
```

**示例 3：函数联动 - 省市区联动**

```json
{
  "label": "省份",
  "name": "province",
  "component": "Select",
  "props": {
    "options": [],
    "onChange": "{{ (params) => {
      const value = params.args[0]
      // 根据省份设置城市
      if (value === '广东') {
        params.$instance.setFieldValue('city', '广州')
      } else if (value === '北京') {
        params.$instance.setFieldValue('city', '北京')
      }
      // 清空区县
      params.$instance.setFieldValue('district', '')
      // 触发验证
      params.$instance.validate()
    } }}"
  }
}
```

**示例 4：复杂的多行函数**

```json
{
  "label": "类型",
  "name": "type",
  "component": "Select",
  "props": {
    "options": [{"label": "个人", "value": "personal"}, {"label": "企业", "value": "company"}],
    "onChange": "{{ (params) => {
      const type = params.args[0]
      if (type === 'company') {
        params.$instance.setFieldValue('companyName', '')
        params.$instance.setFieldValue('taxNumber', '')
      } else {
        params.$instance.setFieldValue('idCard', '')
      }
      params.$instance.validate()
    } }}"
  }
}
```

**可用的 $instance 方法**：

- `getValues()`：获取所有表单数据
- `setValues(values)`：设置所有表单数据
- `getFieldValue(path)`：获取指定字段值
- `setFieldValue(path, value)`：设置指定字段值
- `validate()`：触发表单校验
- `resetFields()`：重置表单
- `submit()`：提交表单
- `updateSelectData(key, value)`：更新下拉框数据
- `updateItemSchemaByPath(name, path, value)`：动态修改字段配置

### 5.4 deepParse 实现原理

**核心功能**：将 `{{ }}` 包裹的 JS 表达式或函数解析为实际值或可执行函数

**关键代码**：

```typescript
// utils/deepParse.ts
const templateParse = (str: string, context: Record<string, any>) => {
  // 使用 [\s\S] 匹配包括换行符在内的所有字符
  const template = str.match(/\{\{([\s\S]+?)\}\}/)
  if (template) {
    try {
      const parse = new Function(Object.keys(context).join(','), 'return ' + template[1])
      const result = parse(...Object.values(context))

      // 如果解析结果是函数，包装它，将 context 和原始参数合并后传入
      if (typeof result === 'function') {
        return (...args: any[]) => {
          const mergedParams = { ...context, args }
          return result(mergedParams)
        }
      }

      return result
    } catch (e) {
      return str
    }
  }
  return str
}

// 递归解析整个 schema
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

**工作流程**：

1. **表达式解析**：`{{ $values.age > 18 }}` → `true/false`
2. **函数解析**：`{{ (params) => params.$values.name }}` → 包装后的函数
3. **函数调用**：事件触发时，自动传入 `{ ...context, args: [event] }`

### 5.5 FunctionEditor 组件

**位置**：`form-craft/src/elements/FunctionEditor/Component.vue`

**功能**：可视化编辑事件处理器函数，提供 Monaco Editor 智能提示

**特性**：

- ✅ 自动添加/移除 JSDoc 类型注释
- ✅ 完整的 TypeScript 智能提示
- ✅ 支持多行函数编辑
- ✅ 自动格式化代码

**使用流程**：

1. **打开编辑器**：自动添加 JSDoc 注释

   ```javascript
   /**@param {Params} params*/
   ;(params) => {}
   ```

2. **编辑时**：输入 `params.` 获得智能提示（$values、$instance 等）

3. **保存时**：自动移除 JSDoc 注释，保存为
   ```json
   "{{ (params) => { ... } }}"
   ```

**类型定义**：

```typescript
interface Params {
  $values: Record<string, any>
  $selectData: Record<string, any>
  $instance: {
    getValues(): Record<string, any>
    setFieldValue(path: string, value: any): void
    validate(): Promise<any>
    // ... 更多方法
  }
  $item?: any
  $index?: number
  args: any[]
}
```

---

## 六、校验系统

### 6.1 8 种校验类型

**1. required** - 必填校验  
**2. min/max** - 长度校验  
**3. pattern** - 正则校验  
**4. builtin** - 内置类型（email、url、date 等）  
**5. enum** - 枚举值  
**6. custom** - 自定义函数  
**7. jsExpr** - JS 表达式校验

---

## 七、核心工具函数

### 7.1 数据路径操作

**getDataByPath** - 支持 `'user.name'`、`'list[0].name'` 格式

**setDataByPath** - 返回新对象，避免直接修改原对象

### 7.2 设计器工具

- `generateDesignKey()` - 生成唯一 designKey
- `generateName()` - 生成字段名
- `repirJsonSchema()` - 修复 schema
- `copyItems()` - 复制表单项
- `removeDesignKeys()` / `restoreDesignKeys()` - 导出/恢复 designKey

---

## 八、依赖注入系统

```
App → provide $globals（全局配置、元素注册表）
FormRender → provide $formInstance（表单实例 API）
FormDesign → provide $designInstance（设计器实例）
```

---

## 九、FormList（自增组件）

### 9.1 三种模式

- **table**：表格模式（默认）
- **card**：卡片模式
- **inline**：行内模式

### 9.2 上下文变量

- `$item`：当前行数据
- `$index`：当前行索引

### 9.3 批量联动

使用 `list.*.checked` 语法实现批量操作

---

## 十、最佳实践

### 10.1 性能优化

#### 已实施的性能优化（2025-11-10）

**1. FormItem 联动优化**

- 缓存 `formValues` 引用，避免在联动中重复调用 `getValues()`
- 提前判断 `linkages.length === 0`，减少不必要的计算
- 优化 `isEqual` 判断位置，先判断再执行

**2. deepParse 缓存机制**

- 使用 `Map` 缓存 Function 实例（最多500个），避免重复创建
- 使用 `for...in` 替代 `reduce`，减少对象创建开销
- 使用传统 `for` 循环替代 `map`，提升数组遍历性能

**3. FormRender computed 优化**

- 移除 schema watch 的 `deep: true`，只监听引用变化
- 添加注释说明 deepParse 已有缓存机制

**4. 路径解析缓存**

- 抽离 `parsePath` 为独立工具函数（`utils/parsePath.ts`）
- `getDataByPath` 和 `setDataByPath` 共享同一个路径解析缓存（最多200个）
- 使用 LRU 策略清除最早的缓存项
- 避免了重复代码，提高了缓存命中率

**5. FormItem config computed 优化**

- 避免直接修改 elements 对象，使用只读方式返回

#### 性能优化建议

1. 避免深层嵌套（控制在 3 层以内）
2. 大数据量时使用 table 模式
3. 避免表达式中的复杂计算
4. 合理使用 `immediate: true`，避免不必要的初始触发
5. 大型表单建议分页或分步骤展示

### 10.2 联动设计

1. **JS 表达式**：用于属性计算
2. **数据联动**：用于字段值修改
3. **避免循环联动**

### 10.3 历史记录管理

**重要**：外部修改 schema 应使用 `updateSchema` 方法：

```typescript
// ❌ 错误：直接修改 v-model（不会记录历史）
formSchema.value = newSchema

// ✅ 正确：通过 ref 调用 updateSchema
formDesignRef.value.updateSchema(newSchema)
```

---

## 十一、API 参考

### FormRender Props

- `schema: FormSchema` - 表单配置
- `schemaContext?: Record` - 自定义上下文
- `design?: boolean` - 设计模式
- `read?: boolean` - 只读模式

### FormRender Methods

- `getValues()` / `setValues()`
- `getFieldValue(path)` / `setFieldValue(path, value)`
- `validate()` / `resetFields()` / `submit()`
- `updateSelectData()` / `updateItemSchemaByPath()`

### FormDesign Methods

- `getSchema()` / `setSchema()` / `applySchema()`
- `updateCurrentKey()` / `getNodeByKey()` / `updateNodeByKey()`
- `handleHistoryBack()` / `handleHistoryForward()` / `handleClear()`

---

## 十二、常见问题

### 12.1 表单数据不更新

**解决**：使用 `setFieldValue` 而非直接修改

### 12.2 联动不生效

**检查**：表达式语法、字段 name、是否在设计模式、linkages type

### 12.3 校验不触发

**检查**：name 属性、规则格式、是否调用 validate()

---

## 总结

Vue Form Craft 通过 **JsonSchema 驱动** + **双向数据绑定** + **依赖注入** 实现高度灵活的低代码表单解决方案。

**核心优势**：

1. 配置即代码（可序列化、可版本控制）
2. 强大联动（JS 表达式 + 数据联动 + 事件系统）
3. 高扩展性（37+ 组件 + 自定义支持）
4. 完善校验（8 种类型）
5. 灵活事件（通过 $instance 可调用所有表单 API）
6. 优秀开发体验（TypeScript + 完善 API）

**适用场景**：后台管理系统、动态表单、问卷调查、数据采集、审批流程

---

## 十三、AI 功能集成

### 13.1 AI 功能概述

Vue Form Craft 支持在多处注入 AI 能力，包括：

1. **AI 对话生成表单**（已实现）：通过自然语言对话生成或修改表单
2. **输入框 AI 生成文本**（规划中）：在文本输入框中使用 AI 辅助填写
3. **AI 生成校验规则**（规划中）：根据字段描述自动生成校验规则

### 13.2 AI 接口注入方式

AI 功能采用**用户全局注入**的设计，组件内部不实现具体的 AI 接口调用，而是由用户在 `app.use` 时注入自定义的 AI 函数。

#### 类型定义

```typescript
// AI 生成参数
export type AiGenerateParams = {
  prompt: string // 提示词
  context?: Record<string, any> // 上下文数据（如当前表单 schema）
  signal?: AbortSignal // 取消信号
}

// AI 接口函数类型
export type AiGenerateFunction = (params: AiGenerateParams) => Promise<any>

// 安装选项
export type Options = {
  ai?: AiGenerateFunction // AI 生成函数
  // ... 其他配置
}
```

#### 基本使用

```typescript
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft'
import App from './App.vue'

const app = createApp(App)

// 注入自定义 AI 函数
app.use(VueFormCraft, {
  ai: async ({ prompt, context, signal }) => {
    // 调用你的 AI 服务
    const response = await fetch('https://your-ai-api.com/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, context }),
      signal
    })

    const result = await response.json()
    return result.data
  }
})

app.mount('#app')
```

### 13.3 AI 辅助工具类

组件内部使用 `AiHelper` 工具类来调用注入的 AI 函数：

```typescript
import { createAiHelper } from 'vue-form-craft'

// 创建 AI 辅助实例
const aiHelper = createAiHelper(aiFunction)

// 检查 AI 功能是否可用
if (aiHelper.isAvailable()) {
  // 生成表单 Schema
  const schema = await aiHelper.generateFormSchema(
    '添加一个用户注册表单',
    currentSchema,
    abortSignal
  )

  // 生成文本内容
  const text = await aiHelper.generateText('生成一段产品介绍')

  // 生成校验规则
  const rule = await aiHelper.generateValidationRule('email', 'Input', '必须是有效的邮箱地址')
}
```

### 13.4 AI 实现示例

项目提供了多个 AI 接口实现示例（位于 `utils/aiExamples.ts`）：

#### 示例 1：使用 Coze AI

```typescript
import { createCozeAiFunction } from 'vue-form-craft/utils/aiExamples'

app.use(VueFormCraft, {
  ai: createCozeAiFunction({
    token: 'your-coze-token',
    botId: '7546913648569729039'
  })
})
```

#### 示例 2：使用 OpenAI

```typescript
import { createOpenAiFunction } from 'vue-form-craft/utils/aiExamples'

app.use(VueFormCraft, {
  ai: createOpenAiFunction({
    apiKey: 'your-openai-key',
    model: 'gpt-4'
  })
})
```

#### 示例 3：自定义实现

```typescript
app.use(VueFormCraft, {
  ai: async ({ prompt, context, signal }) => {
    // 调用你自己的后端 API
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, currentSchema: context }),
      signal
    })

    if (!response.ok) {
      throw new Error('AI 生成失败')
    }

    const result = await response.json()
    return result.schema
  }
})
```

### 13.5 AI 功能在设计器中的使用

在 FormDesign 组件中，用户可以通过 AI 对话来生成或修改表单：

1. **打开 AI 面板**：点击设计器右侧的 AI 图标
2. **输入需求**：描述你想要的表单，例如：
   - "添加一个用户注册表单，包含用户名、邮箱、密码"
   - "给现有表单添加一个地址选择功能"
   - "修改密码字段，要求至少 8 位，包含数字和字母"
3. **AI 生成**：AI 会基于当前表单和你的需求生成新的表单配置
4. **应用结果**：生成的表单会自动应用到设计器中

### 13.6 错误处理

```typescript
app.use(VueFormCraft, {
  ai: async ({ prompt, context, signal }) => {
    try {
      // 检查是否取消
      if (signal?.aborted) {
        throw new Error('已取消生成')
      }

      // 调用 AI 服务
      const result = await yourAiService(prompt, context)

      return result
    } catch (error: any) {
      // 处理取消操作
      if (error.name === 'AbortError') {
        throw new Error('已取消生成')
      }

      // 处理其他错误
      console.error('AI 生成错误:', error)
      throw new Error(`AI 生成失败: ${error.message}`)
    }
  }
})
```

### 13.7 最佳实践

1. **支持取消操作**：使用 `AbortSignal` 支持用户取消长时间的 AI 生成
2. **错误提示友好**：捕获错误并返回用户友好的提示信息
3. **上下文传递**：充分利用 `context` 参数传递当前表单状态，让 AI 生成更准确
4. **结果校验**：对 AI 返回的结果进行校验，确保符合 FormSchema 格式
5. **超时控制**：设置合理的超时时间，避免用户长时间等待
6. **安全性**：不要在前端暴露 API Key，建议通过后端代理调用 AI 服务

### 13.8 未来规划

- **输入框 AI 辅助**：在文本输入框中集成 AI 补全功能
- **校验规则生成**：根据字段描述自动生成合适的校验规则
- **表单优化建议**：AI 分析表单结构并提供优化建议
- **多语言支持**：AI 自动翻译表单标签和提示文本
