# Vue Form Craft 架构文档

## 一、项目概述

### 1.1 项目定位

Vue Form Craft 是一个基于 Vue 3 和 Element Plus 的开源低代码表单组件库，包含**表单设计器（FormDesign）**和**表单渲染器（FormRender）**两大核心组件。

### 1.2 技术栈

- **框架**: Vue 3 (Composition API)
- **UI库**: Element Plus 2.6+
- **工具库**: lodash
- **构建工具**: Vite
- **类型系统**: TypeScript
- **拖拽**: vuedraggable

### 1.3 核心特性

- 可视化设计表单
- 支持30+表单组件（Element Plus所有表单组件 + 内置组件）
- 支持数组数据收集（自增组件FormList）
- 灵活高效的表单联动系统
- JSON配置预览和Vue组件代码预览
- 高扩展性，支持自定义组件和多UI库适配
- 完善的表单校验系统
- 组件无限深层嵌套和深层校验
- AI辅助生成表单（可选）

---

## 二、目录结构

```
formora/
├── src/
│   ├── components/          # 核心组件
│   │   ├── FormRender/      # 表单渲染器
│   │   ├── FormDesign/      # 表单设计器
│   │   ├── FormItem.vue     # 表单项组件
│   │   ├── FormItemGroup.vue # 表单项组
│   │   ├── CanvasItem.vue   # 画布项（设计器用）
│   │   ├── CanvasGroup.vue  # 画布组（设计器用）
│   │   ├── AI/              # AI对话组件
│   │   └── customComponents/ # 自定义组件注册
│   ├── elements/            # 表单元素定义（30+组件）
│   │   ├── Input/           # 单行文本
│   │   ├── FormList/        # 自增容器
│   │   ├── Grid/            # 栅格布局
│   │   └── ...              # 其他组件
│   ├── config/              # 配置文件
│   │   ├── formAttrSchema.ts      # 表单属性配置
│   │   ├── initSchema.ts          # 初始Schema
│   │   └── optionConfig.ts        # 选项配置
│   ├── hooks/               # 组合式函数
│   │   ├── useFormInstance.ts     # 表单实例Hook
│   │   ├── useDesignInstance.ts   # 设计器实例Hook
│   │   ├── useElements.ts         # 元素配置Hook
│   │   ├── useSelect.ts           # 选择器Hook
│   │   └── ...
│   ├── utils/               # 工具函数
│   │   ├── deepParse.ts           # 深度解析（模板引擎）
│   │   ├── parseRules.ts          # 规则解析
│   │   ├── getDataByPath.ts       # 路径取值
│   │   ├── setDataByPath.ts       # 路径赋值
│   │   ├── ns.ts                  # 命名空间
│   │   └── aiHelper.ts            # AI辅助工具
│   ├── types/               # TypeScript类型定义
│   ├── locales/             # 国际化
│   ├── templates/           # 模板
│   ├── Icon/                # 图标组件
│   ├── style.scss           # 全局样式
│   ├── symbol.ts            # 依赖注入Key
│   ├── index.ts             # 入口文件
│   └── install.ts           # 插件安装
├── package.json
└── global.d.ts
```

---

## 三、核心架构

### 3.1 双核心组件设计

#### 3.1.1 FormRender（表单渲染器）

**职责**: 根据JSON Schema渲染表单，处理数据绑定、校验、提交等逻辑。

**核心特性**:

- 使用 `v-model` 双向绑定表单数据
- 支持设计模式（design）和只读模式（read）
- 提供完整的表单实例API
- 支持深层嵌套和动态解析

**关键代码位置**: `/src/components/FormRender/index.vue`

**核心API**:

```typescript
interface FormInstance {
  getValues: () => Record<string, any>
  setValues: (values: Record<string, any>) => void
  getFieldValue: (path: string) => any
  setFieldValue: (path: string, value: any) => void
  validate: () => FormValidationResult
  resetFields: (names?: string[]) => void
  submit: () => void
  updateSelectData: (key: string, value: Record<string, any>) => void
  setFieldAttr: (name: string, path: string, value: any) => void
}
```

#### 3.1.2 FormDesign（表单设计器）

**职责**: 提供可视化表单设计界面，支持拖拽、配置、预览等功能。

**核心特性**:

- 左侧组件菜单（SideBar）
- 中间画布区域（Main）
- 右侧属性配置（Attr）
- 历史记录管理（撤销/重做）
- JSON/Vue代码预览
- 全屏模式

**关键代码位置**: `/src/components/FormDesign/index.vue`

**核心API**:

```typescript
interface DesignInstance {
  getSchema: () => FormSchema
  setSchema: (schema: FormSchema) => void
  setCurrentKey: (key: string) => void
  handleClear: () => void
  handleHistoryBack: () => void
  handleHistoryForward: () => void
  addItem: (item: FormItemType) => void
  recordHistory: (description?: string) => void
}
```

### 3.2 数据流架构

```
用户操作
   ↓
FormDesign (设计器)
   ↓
Schema (JSON配置)
   ↓
FormRender (渲染器)
   ↓
FormItem (表单项)
   ↓
Element Component (具体组件)
```

### 3.3 依赖注入系统

使用 Vue 3 的 `provide/inject` 实现跨组件通信：

```typescript
// symbol.ts
export const $globals = Symbol() // 全局配置
export const $formInstance = Symbol() // 表单实例
export const $designInstance = Symbol() // 设计器实例
```

**注入层级**:

1. **App层**: 通过 `app.use()` 注入全局配置（elements、request、ai等）
2. **FormRender层**: 注入表单实例，供所有子组件使用
3. **FormDesign层**: 注入设计器实例，供设计器子组件使用

---

## 四、核心类型系统

### 4.1 FormSchema（表单配置）

```typescript
type FormSchema = {
  labelWidth?: number // label宽度
  labelAlign?: 'top' | 'left' | 'right' // label对齐
  labelSuffix?: string // label后缀
  size?: 'default' | 'small' | 'large' // 组件尺寸
  disabled?: boolean // 禁用整个表单
  hideRequiredAsterisk?: boolean // 隐藏必填星号
  scrollToError?: boolean // 滚动到错误项
  initialValues?: Record<string, any> // 初始值
  items?: FormItemType[] // 表单项列表
  submitBtn?: boolean // 提交按钮
  resetBtn?: boolean // 重置按钮
}
```

### 4.2 FormItemType（表单项配置）

```typescript
interface FormItemType {
  label?: string // 标签
  labelWidth?: number // 标签宽度
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  name: string // 字段标识（必填）
  component: string // 组件类型（必填）
  required?: boolean // 是否必填
  props?: Record<string, any> // 组件属性
  initialValue?: any // 初始值
  help?: string // 气泡提示
  children?: FormItemType[] // 子项（布局组件用）
  hidden?: boolean | string // 隐藏（支持表达式）
  hideLabel?: boolean // 隐藏标签
  designKey?: string // 设计器唯一标识
  rules?: FormRules // 校验规则
  linkages?: FormLinkage[] // 联动规则
  dialog?: boolean // 弹窗展示
  width?: number // 宽度
  class?: any // CSS类名
  style?: any // 内联样式
}
```

### 4.3 FormElement（组件元素定义）

```typescript
type FormElement = {
  title: string // 组件标题
  component: string // 组件名称
  render: Component // 渲染组件
  icon: VNode | Component // 图标
  type: 'assist' | 'layout' | 'basic' | 'high' // 组件类型
  order: number // 排序
  modelName?: string // v-model绑定名（默认modelValue）
  attrSchema: FormSchema // 属性配置表单
}
```

**组件类型说明**:

- **basic**: 基础组件（Input、Select等）
- **high**: 高级组件（FormList、Upload等）
- **layout**: 布局组件（Grid、Tabs等）
- **assist**: 辅助组件（Title、Divider等）

---

## 五、核心功能实现

### 5.1 模板解析引擎（deepParse）

**位置**: `/src/utils/deepParse.ts`

**功能**: 将 `{{ }}` 包裹的JS表达式转换为实际值，支持访问上下文变量。

**核心特性**: 模板表达式会**实时解析**到 JSON Schema 中，当上下文变量（如 `$values`）变化时，相关的表达式会自动重新计算并更新到 Schema，实现响应式的动态配置。

**核心机制**:

```typescript
// 模板语法 - 表达式
'{{ $values.username }}' // 访问表单值
"{{ $item.type === 'min' }}" // 条件判断
'{{ $selectData.city }}' // 访问选择器数据
"{{ $instance.getFieldValue('age') }}" // 调用实例方法

// 模板语法 - 函数（用于事件处理器）
'{{ () => $values.age > 18 }}' // 无参函数，直接访问全局变量
'{{ (value) => $instance.setFieldValue("city", value) }}' // 带参函数，参数直接传入
'{{ (...args) => console.log($values, args) }}' // 多参数函数
```

**全局变量**(函数中可直接访问):

- `$values`: 表单所有值
- `$selectData`: 选择器组件的源数据
- `$instance`: 表单实例API
- `$item`: FormList中当前行数据
- `$index`: FormList中当前行索引
- 用户自定义的 `schemaContext`

**函数处理机制**:

- 函数通过闭包直接访问全局变量（$values、$instance等）
- 事件参数作为函数参数直接传入

**性能优化**:

- Function实例缓存（避免重复创建）
- 缓存大小限制（最多500个）
- FIFO淘汰策略（先进先出）

### 5.2 表单校验系统

**位置**: `/src/utils/parseRules.ts`

**支持的校验类型**:

1. **required**: 必填校验
2. **min/max**: 最小/最大长度
3. **pattern**: 正则表达式
4. **builtin**: async-validator内置类型（email、url等）
5. **enum**: 枚举值校验
6. **custom**: 自定义函数校验
7. **jsExpr**: JS表达式校验（支持模板语法）

**校验规则配置**:

```typescript
type RuleItem = {
  type: RuleType
  value?: any // 校验值
  message?: string // 错误提示
  trigger?: 'blur' | 'change' // 触发时机
}
```

**示例**:

```javascript
{
  rules: [
    { type: 'required', message: '该字段是必填字段' },
    { type: 'min', value: 6, message: '最少6个字符' },
    { type: 'pattern', value: '^[0-9]+$', message: '只能输入数字' }
  ]
}
```

### 5.3 表单联动系统

**位置**: `/src/components/FormItem.vue` (watch linkages)

**联动类型**:

1. **attr联动**: 修改目标字段的Schema属性
2. **data联动**: 修改目标字段的值

**联动配置**:

```typescript
type FormLinkage = {
  target: string // 目标字段name
  condition?: any // 触发条件（支持表达式）
  type: 'attr' | 'data'
  value?: any // 联动值（支持表达式）
  path?: string // 属性路径（attr联动用）
  customPath?: string // 自定义路径
}
```

**特殊语法**:

- `users.*.password`: FormList批量联动（所有行）
- `users.[].password`: FormList行内联动（当前行）

**示例**:

```javascript
linkages: [
  {
    target: 'password',
    type: 'attr',
    path: 'hidden',
    value: '{{ $values.userType !== "admin" }}',
    condition: true
  }
]
```

### 5.4 路径操作系统

**核心工具**:

- `getDataByPath(data, path)`: 根据路径获取值
- `setDataByPath(data, path, value)`: 根据路径设置值

**支持的路径格式**:

```javascript
'username' // 简单属性
'user.name' // 嵌套对象
'users.0.name' // 数组索引
'company.address.city' // 深层嵌套
```

**位置**: `/src/utils/getDataByPath.ts`, `/src/utils/setDataByPath.ts`

### 5.5 自增组件（FormList）

**位置**: `/src/elements/FormList/FormList.vue`

**功能**: 收集数组类型数据，支持动态增删行。

**三种展示模式**:

1. **table**: 表格模式
2. **card**: 卡片模式
3. **inline**: 行内模式

**核心特性**:

- 支持最小/最大行数限制
- 支持行内联动（`.[].`语法）
- 支持批量联动（`.*.`语法）
- 动态解析每行的字段配置（parseFields）
- 提供 `$item` 和 `$index` 上下文

**配置示例**:

```javascript
{
  component: 'FormList',
  name: 'users',
  props: {
    mode: 'card',
    title: '用户',
    minLines: 1,
    maxLines: 10,
    allowAdd: true,
    allowReduce: true
  },
  children: [
    { label: '姓名', component: 'Input', name: 'name' },
    { label: '年龄', component: 'InputNumber', name: 'age' }
  ]
}
```

---

## 六、组件开发规范

### 6.1 组件注册规范

每个表单组件需要导出一个 `FormElement` 对象：

```typescript
// /src/elements/Input/index.ts
export default {
  title: '单行文本',
  component: 'Input',
  icon: h(Icon, { name: 'input' }),
  type: 'basic',
  order: 1,
  attrSchema, // 属性配置表单
  render: Input // 渲染组件
} satisfies FormElement
```

### 6.2 v-model封装规范

**必须使用 Vue 3.4+ 的 `defineModel` API**:

#### 6.2.1 基本类型数据

对于基本类型（string、number、boolean等），可以直接使用：

```vue
<script setup>
const modelValue = defineModel()
</script>

<template>
  <el-input v-model="modelValue" />
</template>
```

#### 6.2.2 对象类型数据（重要）

**对于对象类型的v-model，不能直接修改对象属性，必须内部维护响应式对象并深度监听**。

原因：直接修改`modelValue.xxx`不会触发父组件的响应式更新。

**正确做法**（参考`StyleEditor.vue`）：

```vue
<script setup>
import { reactive, watch } from 'vue';


const modelValue = defineModel()

// 内部维护响应式对象
const styleForm = reactive<Record<string, any>>({})

// 初始化：modelValue -> styleForm
watch(
  () => modelValue.value,
  (newVal) => {
    if (newVal) {
      Object.assign(styleForm, newVal)
    }
  },
  { immediate: true, deep: true }
)

// 深度监听styleForm变化，实时同步到modelValue
watch(
  styleForm,
  (newVal) => {
    modelValue.value = { ...newVal }  // 创建新对象，触发父组件更新
  },
  { deep: true }
)
</script>

<template>
  <!-- 绑定内部响应式对象 -->
  <el-form :model="styleForm">
    <el-input v-model="styleForm.width" />
    <el-input v-model="styleForm.height" />
  </el-form>
</template>
```

**关键点**：

- 内部使用`reactive`维护对象
- 双向watch同步数据
- 修改时创建新对象`{ ...newVal }`，确保父组件能监听到变化

**禁止使用旧的 props + emit 方式**。

### 6.3 命名空间规范

**HTML中使用ns函数生成class**:

```vue
<template>
  <div :class="ns('my-component')">
    <div class="header">...</div>
  </div>
</template>

<script setup>
import { ns } from '@/utils'
</script>
```

**SCSS中使用ns mixin**:

```scss
@import '@/style';

@include ns('my-component') {
  background: $bgColor;

  .header {
    color: $textColor1;
  }
}
```

**生成的class**: `.vfc-my-component`

### 6.4 样式变量规范

**禁止直接读取Element Plus变量**（如 `var(--el-color-primary)`）。

**必须在 `/src/style.scss` 中定义变量**:

```scss
$themeColor: var(--el-color-primary, #409eff) !default;
$bgColor: var(--el-bg-color, #fff) !default;
```

**可用的颜色变量**:

- `$themeColor`: 主题色
- `$lightThemeColor`: 浅主题色
- `$dangerColor`: 危险色
- `$bgColor`: 背景色
- `$bgColor2`: 背景色2
- `$bgColor3`: 背景色3
- `$successColor`: 成功色
- `$warningColor`: 警告色
- `$borderColor`: 边框色
- `$textColor1`: 主文本色
- `$textColor3`: 次文本色
- `$textColorSecondary`: 辅助文本色

### 6.5 属性配置表单（attrSchema）

**统一结构**（参考 `/src/elements/Input/inputAttrSchema.ts`）:

```typescript
export default {
  labelWidth: 110,
  size: 'small',
  labelAlign: 'left',
  items: [
    {
      name: 'form-tabs',
      component: 'Tabs',
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          children: [
            { label: '标签', name: 'label', component: 'Input' },
            { label: '字段标识', name: 'name', component: 'Input' },
            { label: '占位提示', name: 'props.placeholder', component: 'Input' }
          ]
        },
        {
          label: '校验',
          name: 'rules',
          component: 'TabPane',
          children: [
            /* 校验规则配置 */
          ]
        },
        {
          label: '联动',
          name: 'linkages',
          component: 'TabPane',
          children: [
            /* 联动规则配置 */
          ]
        },
        {
          label: '布局',
          name: 'layout',
          component: 'TabPane',
          children: [
            /* 布局配置 */
          ]
        },
        {
          label: '事件',
          name: 'events',
          component: 'TabPane',
          children: [
            /* 事件配置 */
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
```

**标准Tab结构**: 属性 → 校验 → 联动 → 布局 → 事件 → 样式

---

## 七、扩展机制

### 7.1 扩展可拖拽组件

可参考现有组件实现，如 `/src/elements/Input/`。

**步骤**:

1. **定义组件**:

```vue
<!-- MyCustom.vue -->
<template>
  <div>{{ modelValue }}</div>
</template>

<script setup lang="ts">
const modelValue = defineModel()
</script>
```

2. **定义FormElement**:

```typescript
import { h } from 'vue'
import MyCustom from './MyCustom.vue'

export default {
  title: '自定义组件',
  component: 'MyCustom',
  icon: h(Icon, { name: 'component' }),
  type: 'basic',
  order: 100,
  attrSchema: { items: [] },
  render: MyCustom
} satisfies FormElement
```

3. **导出**:

```typescript
// elements/index.ts
export { default as MyCustom } from './MyCustom'
```

### 7.2 内置自定义组件

项目内置了一些特殊的自定义组件，位于 `/src/components/customComponents/`：

#### 7.2.1 InitialValues（表单初始值编辑器）

用于在设计器中编辑表单的初始值。

**使用方式**:

```typescript
{
  label: '表单初始值',
  component: 'Custom',
  name: 'initialValues',
  props: {
    componentName: 'FormDesign-InitialValues'
  }
}
```

#### 7.2.2 StyleEditor（样式编辑器）

以表单的形式编辑CSS样式，生成style对象。支持布局、边距、边框、背景、文字、Flex等常用样式属性。

**核心特性**:

- 可视化编辑CSS样式
- 支持60+常用样式属性
- 自动过滤空值
- 实时生成style对象

**使用方式**:

```typescript
{
  label: '自定义样式',
  component: 'Custom',
  name: 'style',
  props: {
    componentName: 'FormDesign-StyleEditor'
  }
}
```

**支持的样式类别**:

- 布局：width、height、min/max尺寸
- 外边距：margin系列
- 内边距：padding系列
- 边框：border系列、borderRadius
- 背景：background系列
- 文字：font系列、color、textAlign等
- 显示：display、position、opacity等
- Flex：flexDirection、justifyContent、alignItems等
- 其他：cursor、boxShadow、transition、transform

**文件位置**: `/src/components/customComponents/StyleEditor.vue`

#### 7.2.3 注册自定义组件

在 `/src/components/customComponents/index.ts` 中注册：

```typescript
import InitialValues from './InitialValues.vue'
import StyleEditor from './StyleEditor.vue'

export default (app: any) => {
  app.component('FormDesign-InitialValues', InitialValues)
  app.component('FormDesign-StyleEditor', StyleEditor)
}
```

## 八、性能优化策略

### 8.1 模板解析缓存

- Function实例缓存（deepParse）
- 缓存大小限制500个
- LRU淘汰策略

### 8.2 响应式优化

- 使用 `readonly()` 包装实例，避免不必要的响应式
- 使用 `computed` 缓存计算结果
- 避免深层响应式（必要时使用shallowRef）

### 8.3 组件懒加载

```typescript
render: defineAsyncComponent(() => import('./FormList.vue'))
```

### 8.4 防抖节流

- 历史记录防抖（700ms）
- 远程搜索防抖（300ms）

---

## 九、开发注意事项

### 9.1 修改范围

**主要修改目录**: `/formora/src`

**核心文件**:

- `/src/components/FormRender/index.vue`: 渲染器核心
- `/src/components/FormDesign/index.vue`: 设计器核心
- `/src/components/FormItem.vue`: 表单项核心
- `/src/elements/`: 组件定义
- `/src/utils/`: 工具函数

### 9.3 类型安全

- 所有组件导出必须使用 `satisfies FormElement`
- 所有Schema必须使用 `satisfies FormSchema`
- 充分利用TypeScript类型推导

### 9.4 测试规范

- 工具函数必须有单元测试（`/src/utils/_test_/`）
- 复杂逻辑必须有测试覆盖

### 9.5 schema规范

- schema中所有属性都必须使用标准JSON格式定义

### 9.6 函数传递规范

- 为了符合标准JSON格式定义，函数必须使用js表达式语法，例如 `"{{ () => { /* code */ } }}"`

---

## 十、常见开发场景

### 10.1 新增表单组件

1. 在 `/src/elements/` 创建组件目录
2. 创建组件Vue文件
3. 创建 `index.ts` 导出FormElement
4. 创建 `attrSchema.ts` 定义属性配置
5. 在 `/src/elements/index.ts` 导出

### 10.2 修改联动逻辑

**位置**: `/src/components/FormItem.vue` 的 watch(value) 部分

**注意**:

- 区分 `attr` 和 `data` 联动
- 处理 `.*.` 和 `.[]` 特殊语法
- 避免无限循环（使用isEqual判断）

### 10.3 扩展校验规则

**位置**: `/src/utils/parseRules.ts`

在 switch 中添加新的 case 分支。

### 10.4 修改模板解析

**位置**: `/src/utils/deepParse.ts`

**注意**: 修改缓存策略需要考虑内存泄漏问题。

---

## 十一、调试技巧

### 11.1 查看表单实例

```javascript
// 在组件中
const formInstance = useFormInstance()
console.log(formInstance.getValues())
```

### 11.2 查看设计器实例

```javascript
const designInstance = useDesignInstance()
console.log(designInstance.getSchema())
```

### 11.3 查看解析后的Schema

```javascript
// FormRender中
const formItems = computed(() => {
  return deepParse(props.schema.items || [], context.value)
})
console.log(formItems.value)
```

### 11.4 调试联动

在 `/src/components/FormItem.vue` 的 watch 中添加 console.log。

---

## 十二、未来规划

### 12.1 进行中的任务

1. **重构输入类组件配置表单**: 统一支持属性、校验、联动、布局、事件
2. **自增组件联动教程文档**
3. **可视化配置JS表达式联动**
4. **AI能力增强**:
   - AI生成文本
   - AI生成校验规则
   - AI接口改为用户全局注入

### 12.2 技术债务

- 多UI库适配（Arco Design等）
- 事件系统完善
- 性能监控和优化

---

## 十三、关键API速查

### 13.1 FormRender Props

```typescript
{
  schema: FormSchema           // 表单配置（必填）
  schemaContext?: Record       // 上下文数据
  design?: boolean             // 设计模式
  read?: boolean               // 只读模式
}
```

### 13.2 FormDesign Props

```typescript
{
  schemaContext?: Record       // 上下文数据
  templates?: TemplateData     // 模板数据
  omitMenus?: string[]         // 隐藏的菜单
}
```

### 13.3 Hooks

```typescript
useFormInstance() // 获取表单实例
useDesignInstance() // 获取设计器实例
useElements() // 获取所有组件配置
useGlobals() // 获取全局配置
useSelect(props) // 选择器逻辑
useChildrenModel(props) // 子组件模型
```

---

## 十四、总结

Vue Form Craft 是一个功能完善、架构清晰的低代码表单解决方案。核心设计理念：

1. **双核心**: FormDesign + FormRender 分离
2. **配置驱动**: 一切皆配置（JSON Schema）
3. **高扩展性**: 支持自定义组件、多UI库
4. **类型安全**: 完善的TypeScript支持
5. **性能优先**: 缓存、懒加载、防抖等优化
6. **开发友好**: 清晰的规范和工具函数

**开发建议**:

- 遵循现有的代码规范和命名约定
- 充分利用类型系统避免错误
- 修改核心逻辑前先理解整体架构
- 保持文档同步更新
