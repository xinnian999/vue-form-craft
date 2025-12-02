# Formora 多 UI 适配方案

## 目标

- **解耦 UI 库**：核心能力（schema、联动、校验、设计器）不绑定 Element Plus。
- **支持多 UI**：支持 Element / Arco / Ant Design Vue / Naive UI 等，甚至自定义组件库。
- **保持单库发布**：继续使用一个 npm 包 `formora`，UI 库由用户自行安装。
- **渐进迁移**：兼容现有“以 Element 为主”的 schema，逐步演进为 UI 无关的抽象协议。

---

## 一、整体架构概览

分三层（概念层面），不强制要求物理上拆 core 包或 core 目录：

1. **协议 & 核心能力层**
   - 协议：`FormSchema` / `FormItemType` 以及联动、设计器相关配置。
   - 能力：schema 解析、表单状态管理、校验、联动、渲染调度等（现有实现中已经包含）。
   - 特点：不直接绑定具体 UI 库的组件名，只依赖 Formora 自己的协议。

2. **多 UI 映射层（UI Adapter / 映射函数）**
   - 位置建议：`lib/src/ui/{element, arco, antd, naive}/*`
   - 能力：
     - 逻辑组件名 → 具体 UI 库组件映射（`Input` → `ElInput` / `AInput`）。
     - 逻辑 props → UI 库 props/事件转换。
   - 导出若干 preset：
     - `elementPreset()`
     - `arcoPreset()`
     - `antdPreset()` 等。

3. **应用层 / 使用方式**
   - 使用者自行安装 UI 库（Element / Arco / AntD 等）。
   - 通过 `createFormCraft({ ui: xxxPreset() })` 或 `provide('formora-ui', xxxPreset())` 指定当前使用的 UI。

---

## 一点现实背景说明：Formora 协议 vs Element Plus

- 当前实现虽然绑定 Element Plus 组件进行渲染，但 **Formora 的 Schema 协议并不是对 Element Plus 的 1:1 映射**。
  - 例如：`hidden`、`linkages`、`dialog`、`width` 等字段，以及联动、设计器相关配置，都是 Formora 自己定义的能力，而非 Element 官方 API。
  - `props` 中也包含大量“中性化”的字段（如 `placeholder`、`clearable` 等），并非严格跟随 Element 命名。
- 因此：
  - **协议层的中心是“Formora 协议”本身，而不是 Element Plus**；
  - 多 UI 适配的本质，是从 **Formora 协议 → 各个 UI 库的实际组件 & props** 的映射；
  - Element Plus 目前只是默认实现最完善的一个 UI preset，其它 UI preset（Arco / AntD / Naive / 自定义）会在相同的 Formora 协议之上工作。

这意味着后续演进时：

- 不需要把 Schema 协议强行改造成“完全仿 Element”；
- 可以继续结合实际需求，扩展 / 调整 Formora 协议，然后通过各自的 UI 映射函数去适配不同组件库。

---

## 二、Schema 与类型设计

### 2.1 `FormItemType` 三个分层

当前类型拆解为三部分（已在代码中用注释标识）：

```ts
export interface FormItemType {
  // A. 表单项“通用语义配置”（跟 UI 库无关）
  label?: string
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  name: string
  required?: boolean
  initialValue?: any
  help?: string
  alert?: string
  children?: FormItemType[]
  hidden?: boolean | string
  rules?: FormRules
  class?: any
  style?: any
  linkages?: FormLinkage[]
  dialog?: boolean
  width?: number

  // B. 渲染层（跟 UI 组件强相关）
  component: string // 逻辑组件名：'Input' / 'Select' / 'DatePicker' ...
  props?: Record<string, any> // 逻辑 props，适配层解释

  // C. 设计器内部用的
  designKey?: string
}
```

约定：

- **A 区**：核心表单项配置，完全不绑定具体 UI 库。
- **B 区**：UI 渲染扩展，由 UI Adapter 层解释。
- **C 区**：仅设计器内部使用，运行时可以选择移除。

### 2.2 逻辑组件名约定

`component` 字段使用**逻辑组件名**，不再写 `el-input` / `a-input`，而是：

- 基础输入：`Input`、`Textarea`、`Password`
- 选择类：`Select`、`Cascader`、`TreeSelect`、`RadioGroup`、`CheckboxGroup`、`Switch`
- 日期时间：`DatePicker`、`TimePicker`、`DateTimePicker`、`RangePicker`
- 布局类：`Grid`、`GridItem`、`Divider`、`Tabs`、`TabPane`
- 其他：`Slider`、`Rate`、`Upload`、`CustomComponent` 等

Core 层只认识这些逻辑名，具体映射由 UI Adapter 决定。

### 2.3 逻辑 props 协议（渐进式）

对每个逻辑组件，定义一组“推荐的通用 props”，例如：

- `Input`：`placeholder`、`clearable`、`disabled` 等。
- `Select`：`options`、`multiple`、`clearable` 等。

约定：

- schema 中的 `props` 优先使用逻辑 props。
- 如果有某个 UI 库独有的 props（例如 Element 的 `show-word-limit`），可以透传给对应 UI preset；非 Element preset 视情况忽略或做兼容。

---

## 三、UI Adapter 协议设计

### 3.1 UIRegistry 与 Adapter 接口

```ts
export type LogicalComponentName =
  | 'Form'
  | 'FormItem'
  | 'Input'
  | 'Select'
  | 'DatePicker'
  | 'CheckboxGroup'
  | 'RadioGroup'
  | 'Switch'
  | 'Grid'
  | 'GridItem'
// ...

export interface UIRegistry {
  getComponent(name: LogicalComponentName): any
  mapItemProps?(item: FormItemType): FormItemType
}
```

- `getComponent`：按逻辑名返回对应的 UI 组件（`ElInput` / `AInput` 等）。
- `mapItemProps`（可选）：对 `props` 做 UI 库级别的转换，例如 `clearable` → `allowClear`。

### 3.2 Preset 形式

```ts
export interface UIPresetOptions {
  // 预留：全局大小、主题、国际化等
}

export function elementPreset(options?: UIPresetOptions): UIRegistry {
  /* ... */
}
export function arcoPreset(options?: UIPresetOptions): UIRegistry {
  /* ... */
}
```

Core 层只依赖 `UIRegistry` 接口，不直接引入具体 UI 组件。

---

## 四、Core 渲染流程（简化版）

1. 接收 `FormSchema` + `UIRegistry`。
2. 遍历 `schema.items`，递归生成表单项 vnode。
3. 渲染表单项时：
   - 根据 `item.component`（逻辑名）从 `uiRegistry` 获取真实组件。
   - 将 `item.props` 交给 `mapItemProps` 做转换。
   - 按统一事件协议绑定 `v-model` / `onChange` 等。

伪代码示意：

```ts
function renderFormItem(item: FormItemType, ui: UIRegistry) {
  const Comp = ui.getComponent(item.component as LogicalComponentName)
  const mappedItem = ui.mapItemProps ? ui.mapItemProps(item) : item

  return h(Comp, {
    ...mappedItem.props
    // 统一注入 modelValue / onUpdate:modelValue 等
  })
}
```

---

## 五、使用方式

### 5.1 安装 & 引入示例（Element）

```ts
import ElementPlus from 'element-plus'
import { elementPreset } from 'formora'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)

app.provide('formora-ui', elementPreset())
app.mount('#app')
```

组件中使用：

```vue
<FormRender :schema="schema" :ui="ui" />

<script setup lang="ts">
import { inject } from 'vue'

const ui = inject('formora-ui')
</script>
```

或通过工厂函数包一层：

```ts
import { createFormCraft, elementPreset } from 'formora'

const formCraft = createFormCraft({
  ui: elementPreset()
})

export default formCraft
```

---

## 六、迁移与兼容策略

### 6.1 保留现有 Element 风格 schema

- 当前已存在的 schema 基本都基于 Element props。
- 短期方案：在 `elementPreset` 的 `mapItemProps` 中兼容现有写法：
  - 已经符合逻辑 props 协议的字段：直接映射。
  - 纯 Element 专属字段：直接透传给 `ElXXX`。

### 6.2 渐进式抽象逻辑 props

- 新增 & 文档推荐时，引导用户优先使用逻辑 props。
- 对老 schema 不做硬性修改，确保线上稳定。
- 在文档中维护一份“Element → 逻辑 props 映射表”，方便后续清理和新 UI 适配。

---

## 七、单库多 UI preset 的选择理由

- UI 库全部外部化为 peerDependencies，`formora` 不会因为支持多 UI 而变得臃肿。
- 使用者只需安装一个主库：`formora`，再选择性安装自己需要的 UI 库。
- 内部结构按 `core/` + `ui/` 分层，未来如有需要，可以平滑拆分为：
  - `@formora/core`
  - `@formora/element`
  - `@formora/arco`
- 当前阶段由核心仓库统一维护多 UI preset，降低版本管理和文档成本。
