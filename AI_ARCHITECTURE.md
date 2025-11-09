# Vue Form Craft AI 架构文档

> 本文档专为 AI 快速理解项目架构而设计，涵盖核心概念、数据流、组件系统和最佳实践。

---

## 一、项目概览

**Vue Form Craft** 是基于 Vue 3 + TypeScript + Element Plus 的低代码表单解决方案，通过 JsonSchema 驱动表单的设计和渲染。

### 1.1 核心特性

- 🎨 **可视化设计器**：拖拽式设计，实时预览，支持历史记录（撤销/重做）
- 📋 **JsonSchema 驱动**：配置即代码，所见即所得
- 🔗 **强大联动系统**：支持 JS 表达式联动和数据联动两种方式
- ✅ **完善校验系统**：8 种校验类型（required、min/max、pattern、builtin、enum、custom、jsExpr）
- 🧩 **高扩展性**：37+ 内置组件，支持自定义组件扩展
- 🌐 **国际化**：中英文支持

### 1.2 技术栈

- **核心框架**：Vue 3.5.8 + TypeScript 5.3
- **UI 组件库**：Element Plus 2.11.4
- **构建工具**：Vite 5.0
- **测试框架**：Vitest 2.1
- **工具库**：lodash、vuedraggable-es-fix

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
  $values: formValues.value,        // 表单数据
  $selectData: selectData,          // 下拉框选中的完整数据
  ...props.schemaContext            // 外部传入的自定义上下文
}))

// 解析表达式（非设计模式下）
const formItems = computed(() => {
  if (props.design) return internalSchema.value.items
  return deepParse(internalSchema.value.items || [], context.value)
})

// 对外暴露的 API
const instance = readonly({
  getValues: () => formValues.value,
  setValues: (values) => { formValues.value = values },
  getFieldValue: (path) => getDataByPath(formValues.value, path),
  setFieldValue: (path, value) => {
    formValues.value = setDataByPath(formValues.value, path, value)
  },
  validate: () => form.value!.validate(),
  resetFields: (names) => form.value?.resetFields(names),
  submit: () => { /* 校验后触发 finish/failed 事件 */ },
  updateSelectData: (key, value) => { selectData[key] = value },
  updateItemSchemaByPath: (name, path, value) => { /* 动态修改 schema */ }
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
          temp = setDataByPath(temp, targetParse,
            list.map(item => ({ ...item, [listTarget]: value }))
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
  labelWidth?: number              // label 宽度，默认 150
  labelAlign?: 'left' | 'top' | 'right'  // 对齐方式，默认 'right'
  labelSuffix?: string             // label 后缀，默认 '-'
  labelBold?: boolean              // 是否加粗 label
  size?: 'small' | 'default' | 'large'   // 表单项大小
  disabled?: boolean               // 全局禁用
  hideRequiredAsterisk?: boolean   // 隐藏必填星号
  scrollToError?: boolean          // 滚动到错误字段
  submitBtn?: boolean              // 显示提交按钮
  resetBtn?: boolean               // 显示重置按钮
  initialValues?: Record<string, any>  // 初始值
  items?: FormItemType[]           // 表单项数组
}
```

### 3.2 表单项配置

```typescript
interface FormItemType {
  label?: string                   // 标签文本
  name: string                     // 字段名（必填，唯一标识）
  component: string                // 组件类型（如 'Input'、'Select'）
  props?: Record<string, any>      // 组件 props（透传给 Element Plus）
  required?: boolean               // 是否必填
  initialValue?: any               // 初始值
  help?: string                    // 提示信息
  hidden?: boolean | string        // 是否隐藏（支持表达式）
  hideLabel?: boolean              // 是否隐藏标签
  rules?: FormRules                // 校验规则
  children?: FormItemType[]        // 子表单项（用于布局组件）
  linkages?: FormLinkage[]         // 联动配置
  designKey?: string               // 设计器标识（自动生成）
  dialog?: boolean                 // 是否弹窗展示
  labelWidth?: number              // 单独设置 label 宽度
  labelAlign?: 'top' | 'left' | 'right'  // 单独设置对齐方式
  class?: any                      // 自定义类名
  style?: any                      // 自定义样式
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
      const parse = new Function(
        Object.keys(context).join(','),
        'return ' + template[1]
      )
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
    return Object.keys(prop).reduce((all, key) => ({
      ...all,
      [key]: deepParse(prop[key], context)
    }), {})
  }
  if (isArray(prop)) return prop.map(item => deepParse(item, context))
  return prop
}
```

### 5.2 数据联动（linkages）

**适用场景**：字段值变化时修改其他字段的值或属性

**格式**：

```typescript
interface FormLinkage {
  target: string           // 目标字段的 name
  condition?: any          // 触发条件（支持表达式）
  type: 'attr' | 'data'    // 联动类型
  value?: any              // 修改的值（支持表达式）
  path?: string            // 属性路径（type='attr' 时使用）
  customPath?: string      // 自定义路径
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
1. 避免深层嵌套（控制在 3 层以内）
2. 大数据量时使用 table 模式
3. 避免表达式中的复杂计算

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
2. 强大联动（JS 表达式 + 数据联动）
3. 高扩展性（37+ 组件 + 自定义支持）
4. 完善校验（8 种类型）
5. 优秀开发体验（TypeScript + 完善 API）

**适用场景**：后台管理系统、动态表单、问卷调查、数据采集、审批流程

