# VueFormCraft 多 UI 适配方案

为当前表单设计器抽离出一套统一的组件协议，然后开发一套组件适配器，可扩展适配多套UI库。

## 目标

- **支持多 UI**：支持 Element-Plus / Arco / Ant Design Vue / Naive UI 等，甚至自定义组件库。
- 同一套JsonSchema协议，可以适配多套UI库，一键切换。
- **保持单库发布**：继续使用一个 npm 包 `vue-form-craft`，UI 库由用户自行安装。
- **渐进迁移**：兼容现有“以 element-plus 为主”的 schema，逐步演进为 UI 无关的抽象协议。

---

## 适配进度

**已完成: 27 / 34**

**第一优先级：高频表单组件**

- ✅ Form（表单容器）- 已适配
- ✅ FormItem（表单项）- 已适配
- ✅ Input（输入框）- 已适配
- ✅ Textarea（多行文本）- 已适配
- ✅ Select（选择器）- 已适配
- ✅ RadioGroup（单选框组）- 已适配
- ✅ CheckboxGroup（多选框组）- 已适配
- ✅ DatePicker（日期选择器）- 已适配
- TimePicker（时间选择器）
- ✅ Switch（开关）- 已适配
- ✅ Slider（滑块）- 已适配
- ✅ Rate（评分）- 已适配
- ✅ ColorPicker（颜色选择器）- 已适配（Ant Design Vue 使用原生 input[type=color] 降级）
- ✅ InputNumber（数字输入框）- 已适配
- ✅ Cascader（级联选择器）- 已适配

**第二优先级：布局组件**

- ✅ Card（卡片）- 已适配
- ✅ Divider（分割线）- 已适配
- ✅ Tabs（标签页）- 已适配
- ✅ Collapse（折叠面板）- 已适配

**第三优先级：设计器工具组件**

- ✅ Button（按钮）- 已适配
- ✅ Modal（对话框）- 已适配
- ✅ Alert（警告提示）- 已适配
- ✅ Tooltip（文字提示）- 已适配
- ✅ Tag（标签）- 已适配
- ✅ Message（消息）- 已适配（包含消息提示和确认框）

---

## 实现方案

### 1. 提炼组件适配器协议

根据组件的常用场景提炼出一个`Protocol`接口，包含props、slots（emits通过on开头的驼峰函数整合进props），要保证广泛使用的Vue UI库（Element Plus/Ant Design Vue等）都能支持这些参数，能在适配器里正确转换。

要尽可能保证，后续再扩展其他UI库，都能适配这个组件`Protocol`。

#### 协议设计原则（建议）

- **最小可用集**：优先收敛为主流 UI 库都有的能力，避免把某个库的“特色能力”直接写进协议。
- **行为一致优先**：尽量保证核心交互语义一致（如 v-model 更新、change/blur/focus、clear 等），样式与细节交互允许存在差异。
- **强保证 / 尽力而为**：
  - **强保证**：协议内定义的字段，适配器必须处理（映射/转换/降级），不能依赖“刚好透传生效”。
  - **尽力而为**：不在协议内的扩展字段，允许透传给底层组件，但不承诺跨 UI 库可用。
- **不做像素级一致承诺**：同一协议下不同 UI 库的渲染结果可能不同，但必须保证功能与数据流一致。

#### Protocol 示例

```typescript
// types/uiAdapter.ts
import type { Component, VNode } from 'vue'

/**
 * Input 组件协议
 */
export interface InputProtocol {
  props: {
    modelValue: string | undefined
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    maxlength?: number
    showWordLimit?: boolean
    size?: 'large' | 'default' | 'small'
    // 事件通过 on 开头的驼峰函数整合进 props
    'onUpdate:modelValue'?: (value: string) => void
    onBlur?: (e: Event) => void
    onFocus?: (e: Event) => void
    onChange?: (value: string) => void
    onInput?: (value: string) => void
    onClear?: () => void
  }
  slots: {
    prefix?: () => VNode
    suffix?: () => VNode
    prepend?: () => VNode
    append?: () => VNode
  }
}

/**
 * Select 组件协议
 */
export interface SelectProtocol {
  props: {
    modelValue: any
    options?: Array<{ label: string; value: any; disabled?: boolean }>
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    multiple?: boolean
    filterable?: boolean
    size?: 'large' | 'default' | 'small'
    'onUpdate:modelValue'?: (value: any) => void
    onChange?: (value: any) => void
    onClear?: () => void
  }
  slots: {
    prefix?: () => VNode
    empty?: () => VNode
  }
}

/**
 * UI适配器 - 包含所有组件的适配器
 */
export interface UIAdapter {
  // 表单组件
  Input: Component<InputProtocol['props']>
  Select: Component<SelectProtocol['props']>
  // ... 其他组件
}
```

说明：以上类型示例主要用于表达“适配器组件需要接受协议定义的 props/slots 形态”。具体以项目内实际 `UIAdapter` 类型定义为准。

### 2. 适配UI库的过程实现

扩展每个ui库都需要根据`UIAdapter`接口，去适配每一个内置组件的协议。

利用`defineComponent`，在内部中转props,slots，来实现适配。

最后获得一个适配了所有内置组件的`UIAdapter`对象。

#### Element-Plus 适配器示例

```typescript
// uiAdapter/ElementPlusAdapter.ts
import { ElForm, ElInput, ElSelect } from 'element-plus'
import { defineComponent, h, ref } from 'vue'
import type { UIAdapter } from '@/types/uiAdapter'

const ElementPlusAdapter: UIAdapter = {
  // Element-Plus 的 Input 组件与协议完全兼容，直接透传
  Input: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElInput, attrs, slots)
    },
    { inheritAttrs: false }
  ),

  // Select 组件同样直接透传
  Select: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElSelect, attrs, slots)
    },
    { inheritAttrs: false }
  )
}

export default ElementPlusAdapter
```

#### Ant Design Vue 适配器示例

```typescript
// uiAdapter/AntdAdapter.ts
import { Button, Form, Input, Select } from 'ant-design-vue'
import { defineComponent, h, ref } from 'vue'
import type {
  ButtonProtocol,
  FormProtocol,
  InputProtocol,
  SelectProtocol,
  UIAdapter
} from '@/types/uiAdapter'

const AntdAdapter: UIAdapter = {
  // Ant Design Vue 的 Input 需要适配属性名称
  Input: defineComponent(
    (_, { slots, attrs }) => {
      const props = attrs as InputProtocol['props']

      return () =>
        h(
          Input,
          {
            ...attrs,
            // modelValue -> value
            value: props.modelValue,
            'onUpdate:value': (value: string) => {
              props['onUpdate:modelValue']?.(value)
            },
            // clearable -> allowClear
            allowClear: props.clearable,
            // showWordLimit -> showCount
            showCount: props.showWordLimit,
            maxLength: props.maxlength
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

  // Select 组件适配
  Select: defineComponent(
    (_, { slots, attrs }) => {
      const props = attrs as SelectProtocol['props']

      return () =>
        h(
          Select,
          {
            ...attrs,
            value: props.modelValue,
            'onUpdate:value': (value: any) => {
              props['onUpdate:modelValue']?.(value)
            },
            allowClear: props.clearable,
            showSearch: props.filterable,
            mode: props.multiple ? 'multiple' : undefined
          },
          slots
        )
    },
    { inheritAttrs: false }
  )
}

export default AntdAdapter
```

### 3. 使用方式

插件 `install(app, options)` 支持一个可选的 `options.ui` 参数，该参数接收一个 `UIAdapter` 对象。默认使用 `Element-Plus` 的 `UIAdapter`。

内部将通过provide向全局注入UIadapter。

**封装useUI**，`useUI`通过inject接收，然后返回UIadapter。将库中所有使用的el组件换成从useUI获取

#### 注入适配器示例

```typescript
// main.ts
import VueFormCraft, { AntdAdapter, ElementPlusAdapter } from 'vue-form-craft'
import { createApp } from 'vue'
import App from './App.vue'
// 方式3: 自定义适配器
import MyCustomAdapter from './MyCustomAdapter'

const app = createApp(App)

// 方式1: 使用默认的 Element-Plus (不传 ui 参数)
app.use(VueFormCraft)

// 方式2: 使用 Ant Design Vue
app.use(VueFormCraft, {
  ui: AntdAdapter
})

app.use(VueFormCraft, {
  ui: MyCustomAdapter
})

app.mount('#app')
```

#### 内部 provide 实现示例 (done)

```typescript
// install.ts
import type { App } from 'vue'
import type { UIAdapter } from '@/types/uiAdapter'
import ElementPlusAdapter from '@/uiAdapter/ElementPlusAdapter'

export const UI_ADAPTER_KEY = Symbol('UI_ADAPTER')

export interface VueFormCraftOptions {
  ui?: UIAdapter
}

export function install(app: App, options: VueFormCraftOptions = {}) {
  const uiAdapter = options.ui || ElementPlusAdapter

  // 全局注入 UI 适配器
  app.provide(UI_ADAPTER_KEY, uiAdapter)

  // ... 其他安装逻辑
}
```

#### useUI 的封装 （done）

```typescript
// composables/useUI.ts
import { inject } from 'vue'
import { UI_ADAPTER_KEY } from '@/install'
import type { UIAdapter } from '@/types/uiAdapter'
import ElementPlusAdapter from '@/uiAdapter/ElementPlusAdapter'

export function useUI(): UIAdapter {
  const uiAdapter = inject<UIAdapter>(UI_ADAPTER_KEY, ElementPlusAdapter)
  return uiAdapter
}
```

#### useUI 使用示例

```vue
<!-- 使用 useUI 获取适配器的组件 -->
<template>
  <Input v-model="value" placeholder="请输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUI } from '@/hooks'

const { Input } = useUI()
const value = ref('')
</script>
```

## 注意事项

- 暂时先适配`Element-Plus`和`Ant Design Vue`，把这两个适配完美后，就可高效率的再扩展其他UI库。
- 提炼出的每个组件`Protocol`，需要放到总的`UIAdapter`里，作为内置组件库的类型。 这个`UIAdapter`与UI库解耦，作为表单设计器的自有组件库抽象，其他UI库需要往这个接口适配
- 对于方法调用类组件（如 Message、MessageBox），应该合并为一个对象，便于统一管理和调用
- **映射优先，透传兜底**：
  - 协议内字段必须在适配器中显式映射/转换（包括事件与 v-model）。
  - 非协议字段允许透传（给用户扩展空间），但不保证跨 UI 库可用。
- **区分两类适配**：
  - **Components**：用于渲染的组件（Input/Select/Form/Modal/Tabs 等）。
  - **Services**：命令式 API（如 message、confirm 等）。建议在 `UIAdapter` 中以对象形式暴露，便于统一调用。
- **每次新增协议组件必须补齐所有 UIAdapter**：建议通过 TypeScript 约束（例如 `satisfies UIAdapter`）让缺失字段在编译期报错，避免“口头约束”。
- 适配器中的属性映射必须准确，确保不同 UI 库的行为一致
- 对于不支持的属性，应该提供合理的降级方案
- 所有组件必须通过 `useUI()` 获取，不能直接导入 UI 库组件
- **实例方法暴露**：对于有实例方法的组件（如 Form、Table 等），必须通过 `ref` + `expose` 暴露底层组件的所有实例方法，确保外部可以调用这些方法
- **Ant Design Vue 的 Tabs 组件特殊处理**：Tabs 会直接读取子节点 VNode 的 props，而不是等子组件渲染。因此需要在 Tabs 适配器的 slots.default 中手动修改子节点的 props，将 `label` 转换为 `tab`
- **类型提示**: 使用 TypeScript 时,切换 UI 库后类型提示保持一致
- **插槽适配**: 不同 UI 库的插槽名称可能不同,需要在适配器中进行映射
- **事件适配**: 事件名称和参数可能不同,需要在适配器中统一转换为协议定义的格式
- **外部化依赖**: vue-form-craft 将所有 UI 库设置为 peerDependencies,不会打包进库中
- 部分组件的样式适配，需要在src/style.scss中进行穿透，注意不要使用deep选择器。
- 适配的时候，不要使用嵌套的三目运算，因为不好维护。
