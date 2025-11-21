# Select 等选项类组件数据源设计方案

> 面向 vue-form-craft 的整体规划文档，仅为架构与 API 设计建议，不直接约束实现细节。

## 目标

- 统一 Select / TreeSelect / Cascader 等 **选项类组件** 的数据源能力。
- 兼容当前实现（`mode: 'static' | 'remote'` + `api`），在此基础上演进。
- 支持不同项目对 API 的不同组织方式：
  - 直接配置 `url + method + params`
  - 使用项目已有的 **API 函数**（如 `getUserList`）
  - 完全自定义的异步函数（兜底 / 高级模式）
- 为后续的：
  - **联动配置（基于其他字段 / selectData）**
  - **表达式 / JS 规则引擎**
  - **AI 生成表单 / 联动规则**
    预留清晰的扩展点。

---

## 一、当前实现回顾

以 `form-craft/src/elements/Select/Select.vue` 与 `form-craft/src/hooks/useSelect.ts` 为例：

### 1. SelectProps（节选）

```ts
export interface SelectProps {
  options?: Record<string, any>[]
  multiple?: boolean
  mode?: string // 'static' | 'remote'
  labelKey?: string
  valueKey?: string
  disabledKey?: string
  api?: SchemaApi // { url, method, params, dataPath, ... }
  name?: string
}
```

### 2. useSelect 核心逻辑（节选）

- `mode === 'static'` 时：直接使用 `props.options`。
- `mode === 'remote'` 时：
  - 使用 `props.api` + 全局 `useRequest` 请求远程数据。
  - 用 `dataPath` 和 `labelKey / valueKey` 解析为 `currentOptions`。
- 监听 `props.api`、`props.options`、`props.mode` 做刷新。
- 在 `selectChange` 中：
  - 基于 `currentOptions` + `valueKey` 反查出完整选中项数据（单选：对象，多选：数组）。
  - 调用 `formInstance.updateSelectData(name, valueData)` 存入表单级 `selectData`。

### 3. FormRender 中的 selectData

- 在 `FormRender/index.vue` 中：
  - 维护 `selectData: Record<string, any>`（当前实现类型上还不区分单选 / 多选）。
  - 暴露 `updateSelectData(name, valueData)` 给子组件使用。

**结论：**

- 目前已很好地支持：
  - 静态 options
  - 简单远程接口（`url+method+params+dataPath`）
  - 保存选中项完整数据到 `selectData`，用于其他字段联动。
- 瓶颈主要在：
  - API 只能在 schema 里**写死**，不好与项目现有 API 函数整合。
  - 远程数据源形式单一，不利于覆盖更多真实项目需求。

---

## 二、选项数据源的类型规划

### 1. 数据源类型总览

建议为所有选项类组件统一抽象一个数据源类型：

```ts
type DataSourceType =
  | 'static' // 静态 options
  | 'remote' // 远程接口（含多种模式）
  | 'linked' // 基于其他字段联动生成 options
  | 'expression' // 基于表达式/函数生成 options（高级）
```

在 Select 上体现为：

```ts
interface SelectDataSourceConfig {
  type: DataSourceType
  // 不同 type 有不同子配置，见下文
}
```

当前已有的 `mode: 'static' | 'remote'` 可以视为 `type` 的一个近似实现，后续可以兼容演进：

- `mode === 'static'` → `type: 'static'`
- `mode === 'remote'` → `type: 'remote'`

### 2. 四大类数据源语义

#### 2.1 静态数据源（static）

- **场景**：固定枚举值、小体量、demo、快速开发。
- **配置**：
  ```ts
  interface StaticDataSource {
    type: 'static'
    options: Option[]
    labelKey?: string // 默认 'label'
    valueKey?: string // 默认 'value'
    groupKey?: string // 可选分组字段
  }
  ```
- 利：简单、直观、无副作用、易文档化。
- 弊：与后端不联动，难以维护大规模枚举。

#### 2.2 远程数据源（remote）——细分三种实现

远程数据源统一目标：**最终产出 `Option[]`**。区别在于“请求 + 解析谁来负责”。

##### 2.2.1 方式一：schema 直接配置请求 + 响应处理

> 即你提的第 1 种：`url + method + params/data` + `dataPath + labelKey + valueKey`。

- 配置示例：

  ```ts
  interface SchemaRequestRemote {
    type: 'remote'
    mode: 'schemaRequest'
    request: {
      url: string
      method: 'GET' | 'POST' | 'PUT' | 'DELETE'
      params?: Record<string, any>
      data?: Record<string, any>
    }
    response?: {
      dataPath?: string // 如 'data.list'
      labelKey?: string
      valueKey?: string
      disabledKey?: string
    }
  }
  ```

- 优点：
  - 完全声明式，适合低代码 / 存库 / AI 生成。
  - 不依赖项目的 API 封装层，开箱即用。
- 缺点：
  - API 细节写在 schema 里，不利于大型项目统一管理。
  - 需要用户适配你的 `request` 行为（拦截器、header 等）。

##### 2.2.2 方式二：引用全局 API（函数或执行器）+ 响应处理

> 即你提的第 2 种：**用户传入全局 api，表单调用，仍需配置响应处理**。

- 思路：
  - 项目方统一维护：
    ```ts
    const apiRegistry = {
      'user.getList': getUserList,
      'dict.getStatus': getStatusDict
    }
    ```
  - 或提供一个统一的 `apiExecutor`：
    ```ts
    type ApiExecutor = (key: string, params: any) => Promise<any>
    ```
  - 在 `app.use(FormCraft, { apiRegistry / apiExecutor })` 时注入。
- schema 只需要：
  ```ts
  interface ApiKeyRemote {
    type: 'remote'
    mode: 'apiKey'
    apiKey: string
    params?: Record<string, any> // 支持从表单值/上下文映射
    response?: {
      dataPath?: string
      labelKey?: string
      valueKey?: string
      disabledKey?: string
    }
  }
  ```
- 优点：
  - 项目沿用原本的 API 函数封装，无需再定义 url/method。
  - 接口变更只需改函数，不动 schema。
- 缺点：
  - 要求项目提前注册 apiKey → 函数映射。
  - `dataPath`/`labelKey`/`valueKey` 仍在 schema 中零散配置（但这一点与方式一相同）。

##### 2.2.3 方式三：支持用户传入异步函数（完全自定义）

> 即你提的第 3 种：**用户传入 async 函数，表单只负责 `await options`**。

- 接口形态示例：

  ```ts
  type FetchOptionsFn = (ctx: {
    formValues: Record<string, any>
    selectData: Record<string, any>
    extra?: any
  }) => Promise<Option[]>

  interface CustomFnRemote {
    type: 'remote'
    mode: 'customFn'
    fetchOptions: FetchOptionsFn
  }
  ```

- 优点：
  - 灵活度最高：多接口合并、缓存策略、权限控制都能自定义。
  - 对于“纯代码使用”场景尤其友好。
- 缺点：
  - 不适合完全低代码用户（需要 JS 能力）。
  - 函数不好直接存储到 schema / DB，需要表达式 + 运行时解析来兜底。

##### 2.2.4 统一 remote 处理逻辑

可以在内部抽象一个统一的远程解析函数：

```ts
async function resolveRemoteOptions(
  config: RemoteRemoteConfig,
  ctx: FetchContext
): Promise<Option[]> {
  switch (config.mode) {
    case 'schemaRequest':
      // 使用内置 useRequest + config.request + config.response
      break
    case 'apiKey':
      // 调用用户注入的 apiExecutor(apiKey, params) 或 apiRegistry[apiKey]
      break
    case 'customFn':
      return await config.fetchOptions(ctx)
  }
}
```

> 其中 `FetchContext` 至少可包含：
>
> - `formValues`：当前表单值
> - `selectData`：当前所有字段的选中项完整数据
> - `fieldName`：当前字段名
> - 其他上下文（如全局 context / 环境变量等）

#### 2.3 联动数据源（linked）

> 使用 **其他字段的值 / selectData** 生成当前字段的 options。

- 简单形态：基于映射表。
  ```ts
  interface LinkedDataSource {
    type: 'linked'
    dependOn: string | string[] // 依赖字段名
    // 简单映射：value → options
    mapping?: Record<string, Option[]>
    // 高级联动：表达式/规则
    expression?: string // 如 "(form, selectData) => [...]"
  }
  ```
- 作用：
  - 级联选择、父子分类、根据用户角色过滤 options 等。
- 与 `selectData` 的关系：
  - 可以用 `selectData[parentField]` 中的完整对象属性来决定 options。

#### 2.4 表达式数据源（expression）

> 完全由表达式/函数生成 options，适合高级规则和可视化规则引擎。

- 接口示例：
  ```ts
  interface ExpressionDataSource {
    type: 'expression'
    expression: string // 约定签名：(formValues, selectData, context) => Option[] | Promise<Option[]>
  }
  ```
- 主要作为：
  - 联动引擎的“最终 fallback”，
  - 或可视化规则编辑器的“编译产物”。

---

## 三、与 selectData 的配合

### 1. 当前行为

- Select 内部通过 `useSelect`：
  - 监听选中值变化。
  - 通过 `currentOptions` + `valueKey` 找到完整选项对象。
  - 通过 `formInstance.updateSelectData(name, valueData)` 存入表单级别。
- Form 维护：
  - `selectData: Record<string, any>`
  - 用于其他字段联动、显示、规则判断等。

### 2. 建议的类型微调

由于多选时 `valueData` 实际为数组，建议类型层面更精确：

```ts
export type SelectDataValue = Record<string, any> | Record<string, any>[]

export interface FormInstance extends FormRenderProps {
  selectData: Record<string, SelectDataValue>
  updateSelectData: (key: string, value: SelectDataValue) => void
  // ...其他方法
}
```

### 3. 定位与约定

- `formValues`：
  - 只存“提交值”（字符串 / 数字 / id 数组等）。
- `selectData`：
  - 存“当前选中项的完整数据对象（或数组）”。
  - 不参与最终表单提交，仅用于：
    - 跨字段联动
    - 展示 / 衍生信息
    - 规则 / 表达式 / AI 提示词上下文

---

## 四、Select 组件侧的 API 设计建议

### 1. 向下（ElSelect）

- 保持当前的：
  - `v-model` 绑定 **纯值或值数组**。
  - 通过 `currentOptions` 渲染所有 `el-option`。

### 2. 向上（FormRender / 表单引擎）

- 保持当前：
  - `useFormInstance()` 拿到表单实例。
  - 在 `selectChange` 中更新 `selectData`。
- 可以考虑统一事件签名（可选）：

  ```ts
  // 内部实现：
  const onChange = (value: any, optionOrOptions: SelectDataValue) => {
    emit('change', value, optionOrOptions)
    formInstance.updateSelectData(name, optionOrOptions)
  }
  ```

- 好处：
  - 表单引擎和单独使用 Select 组件时都能利用“完整选项数据”。

### 3. useSelect / useSelectDataSource 的职责划分

建议引入一个更通用的 hook，例如：

```ts
function useSelectDataSource(props: SelectProps, ctx: FetchContext) {
  // 负责基于 props.dataSource / props.mode / props.api 等
  // 生成 currentOptions、loading、fetchData
}
```

- 当前 `useSelect` 中的：
  - `mode === 'static'` 分支 → 静态数据源逻辑
  - `mode === 'remote'` + `api` 分支 → remote/schemaRequest 逻辑
- 后续可以逐步迁移为：
  - 根据统一的数据源配置 config → 生成 `currentOptions`。

---

## 五、远程数据源三种方式的对比与推荐定位

### 1. 方案一：schema 直接配置 HTTP 请求

- **定位**：
  - 默认方案
  - demo、文档示例
  - 小项目 / 不想封装 API 层时
- **使用门槛**：低
- **灵活度**：中
- **与项目 API 规范耦合度**：中（需适配 request）。

### 2. 方案二：引用全局 API（函数 / 执行器）

- **定位**：
  - 中大型项目推荐方案
  - 需要统一管理接口、方便重构时
- **使用门槛**：中（需要项目提供 apiRegistry / apiExecutor）
- **灵活度**：高（由项目 API 函数负责底层逻辑）
- **与项目 API 规范耦合度**：低（你只依赖 apiKey + params）。

### 3. 方案三：直接传入自定义 async 函数

- **定位**：
  - 高级 / 兜底方案
  - 特殊需求、复杂逻辑、实验性场景
- **使用门槛**：高（需要 JS + 异步编程能力）
- **灵活度**：最高
- **与项目 API 规范耦合度**：最小（完全由用户控制）。

### 4. 推荐组合策略

- 对于库本身（文档与默认行为）：
  - **首推** 方案一（易上手），演示用。
  - 明确文档中推荐 **中大型项目使用** 方案二（apiKey + apiExecutor）。
  - 将方案三标记为“高级模式 / 扩展点”。

- 对于 Select 组件：
  - 对外暴露统一的数据源配置（dataSourceConfig）。
  - 内部根据不同 mode 调用对应的处理逻辑。

---

## 六、联动与表达式的后续扩展方向

结合 todo 里“支持可视化配置 JS 表达式联动”的规划，可以：

1. 在表单引擎中统一定义：
   - `formValues`：所有字段值
   - `selectData`：所有字段选中项完整数据
   - `context`：用户注入的全局上下文（如用户信息、环境变量等）

2. 表达式统一约定签名：

   ```ts
   type ExpressionFn = (formValues: any, selectData: any, context: any) => any
   ```

3. 在：
   - 联动显隐 / 只读
   - 动态校验规则
   - 数据源 options 生成
     中统一使用这套表达式机制，让数据源只是整个“规则系统”的一部分。

---

## 七、渐进式改造建议

为避免一次性大重构，可以按以下节奏逐步演进：

1. **类型层面小步改进**
   - 补充 / 调整 `FormInstance.selectData` 与 `updateSelectData` 类型，准确区分单选/多选。
   - 为 `SelectProps` 增加 dataSourceConfig（不影响现有的 `mode` 和 `api`）。

2. **封装统一的 useSelectDataSource**
   - 先仅支持现有逻辑（static + remote/api）。
   - 内部接口预留 remote 三种方式，将来渐进接入。

3. **引入 apiKey + apiExecutor 机制**
   - 在 `FormCraft.install` 时支持用户注入 apiExecutor / apiRegistry。
   - 在 dataSourceConfig 中支持 `mode: 'apiKey'`。

4. **预留 customFn / expression 能力**
   - 在 props / schema 类型中预留字段，但实现可以先简单：
     - customFn：直接调用
     - expression：简单 eval / sandbox（后续再优化）

5. **在文档中分层说明三种远程方式与使用场景**
   - 帮使用者根据项目体量和规范做选择。

---

以上方案旨在：

- 在保持当前实现和用法基本不变的前提下，
- 给 Select 等选项类组件的数据源能力，
- 设计一个**可渐进增强、易文档化、易与项目 API 整合**的长期演进方向。
