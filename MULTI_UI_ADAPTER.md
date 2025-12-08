# Formora 多 UI 适配方案

## 现状

当前低代码表单/表单设计器，是基于 Element-Plus 开发的。schema大部分组件的协议字段，也遵循了element-plus的风格。

所以只能配合Element-Plus 使用。

## 目标

- **支持多 UI**：支持 Element-Plus / Arco / Ant Design Vue / Naive UI 等，甚至自定义组件库。
- **保持单库发布**：继续使用一个 npm 包 `formora`，UI 库由用户自行安装。
- **渐进迁移**：兼容现有“以 element-plus 为主”的 schema，逐步演进为 UI 无关的抽象协议。

---

## 适配进度

**已完成: 23 / 34**

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
- Upload（上传）
- ✅ InputNumber（数字输入框）- 已适配
- Cascader（级联选择器）

**第二优先级：布局组件**

- ✅ Card（卡片）- 已适配
- Divider（分割线）
- ✅ Tabs（标签页）- 已适配
- ✅ Collapse（折叠面板）- 已适配

**第三优先级：设计器工具组件**

- ✅ Button（按钮）- 已适配
- ✅ Modal（对话框）- 已适配
- ✅ Alert（警告提示）- 已适配
- Tag（标签）
- Table（表格）
- TableColumn（表格列）
- ✅ Message（消息）- 已适配（包含消息提示和确认框）

---

## 实现方案

### 1. 提炼组件协议

当前使用的每个`Element-Plus`组件，根据使用场景，提炼出一个`Protocol`接口。包含props、slots（emits通过on开头的驼峰函数整合进props），后续扩展其他UI库都要兼容这套协议。

#### 提炼规则

- 首先提炼elements下基于El二次封装的组件，目前大部分组件都是直接透传参数给el原组件,提炼的话首先应该根据attrSchema支持props配置生成，注意提炼出的参数，必须两个ui库都支持。
- 提炼出的每个组件`Protocol`，需要放到总的`UIAdapter`里，作为内置组件库的类型。 这个`UIAdapter`与UI库解耦，其他UI库需要往这个接口适配
- 对于方法调用类组件（如 Message、MessageBox），应该合并为一个对象，便于统一管理和调用

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

### 2. 适配UI库的过程实现

扩展每个ui库都需要根据`UIAdapter`接口，去适配每一个内置组件的协议。

利用`defineComponent`，在内部中转props,slots，来实现适配。

最后获得一个适配了所有内置组件的`UIAdapter`对象。

需要内置实现几套常用UI的`UIAdapter`对象，比如`Element-Plus`,`ant-design-vue`,`Arco`等，然后作为库的导出。

#### Element-Plus 适配器示例

```typescript
// uiAdapter/ElementPlusAdapter.ts
import { ElForm, ElInput, ElSelect } from 'element-plus'
import { defineComponent, h, ref } from 'vue'
import type { UIAdapter } from '@/types/uiAdapter'

const ElementPlusAdapter: UIAdapter = {
  // Form 组件需要暴露实例方法
  Form: defineComponent(
    (_, { slots, attrs, expose }) => {
      const formRef = ref()

      // 暴露底层 ElForm 的所有方法
      expose({
        validate: (...args: any[]) => formRef.value?.validate(...args),
        validateField: (...args: any[]) => formRef.value?.validateField(...args),
        resetFields: (...args: any[]) => formRef.value?.resetFields(...args),
        scrollToField: (...args: any[]) => formRef.value?.scrollToField(...args),
        clearValidate: (...args: any[]) => formRef.value?.clearValidate(...args)
      })

      return () =>
        h(
          ElForm,
          {
            ref: formRef,
            ...attrs,
            labelPosition: (attrs as any).labelAlign
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

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
  // Form 组件需要暴露实例方法
  Form: defineComponent(
    (_, { slots, attrs, expose }) => {
      const propsAttrs = attrs as FormProtocol['props']
      const formRef = ref()

      // 暴露底层 Ant Design Vue Form 的所有方法
      expose({
        validate: (...args: any[]) => formRef.value?.validate(...args),
        validateFields: (...args: any[]) => formRef.value?.validateFields(...args),
        resetFields: (...args: any[]) => formRef.value?.resetFields(...args),
        scrollToField: (...args: any[]) => formRef.value?.scrollToField(...args),
        clearValidate: (...args: any[]) => formRef.value?.clearValidate(...args)
      })

      return () =>
        h(
          Form,
          {
            ref: formRef,
            ...attrs,
            layout: propsAttrs.inline
              ? 'inline'
              : propsAttrs.labelAlign === 'top'
                ? 'vertical'
                : 'horizontal'
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

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
  ),

  // Button 组件适配
  Button: defineComponent(
    (_, { slots, attrs }) => {
      const props = attrs as ButtonProtocol['props']

      return () => {
        // type 适配: text -> link, warning/info -> default (Ant Design Vue 不支持 warning 和 info)
        let buttonType: 'primary' | 'dashed' | 'link' | 'text' | 'default' | undefined
        if (props.type === 'text') {
          buttonType = 'link'
        } else if (props.type === 'warning' || props.type === 'info') {
          buttonType = 'default'
        } else if (props.type === 'default') {
          buttonType = undefined
        } else {
          buttonType = props.type
        }

        return h(
          Button,
          {
            ...attrs,
            type: buttonType,
            danger: props.type === 'danger',
            shape: props.circle ? 'circle' : props.round ? 'round' : undefined
          },
          slots
        )
      }
    },
    { inheritAttrs: false }
  )
}

export default AntdAdapter
```

### 3. 使用方式

Vue.use.options将扩展一个`ui`参数（非必传），这个参数需要接收一个UIadapter对象。默认是`Element-Plus`的UIadapter。

内部将通过provide向全局注入UIadapter。

**封装useUI**，`useUI`通过inject接收，然后返回UIadapter。将库中所有使用的el组件换成从useUI获取

#### 注入适配器示例

```typescript
// main.ts
import Formora, { AntdAdapter, ElementPlusAdapter } from 'formora'
import { createApp } from 'vue'
import App from './App.vue'
// 方式3: 自定义适配器
import MyCustomAdapter from './MyCustomAdapter'

const app = createApp(App)

// 方式1: 使用默认的 Element-Plus (不传 ui 参数)
app.use(Formora)

// 方式2: 使用 Ant Design Vue
app.use(Formora, {
  ui: AntdAdapter
})

app.use(Formora, {
  ui: MyCustomAdapter
})

app.mount('#app')
```

#### 内部 provide 实现示例

```typescript
// install.ts
import type { App } from 'vue'
import type { UIAdapter } from '@/types/uiAdapter'
import ElementPlusAdapter from '@/uiAdapter/ElementPlusAdapter'

export const UI_ADAPTER_KEY = Symbol('UI_ADAPTER')

export interface FormoraOptions {
  ui?: UIAdapter
}

export function install(app: App, options: FormoraOptions = {}) {
  const uiAdapter = options.ui || ElementPlusAdapter

  // 全局注入 UI 适配器
  app.provide(UI_ADAPTER_KEY, uiAdapter)

  // ... 其他安装逻辑
}
```

#### useUI 使用示例

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

#### 组件中使用示例

```vue
<!-- 原来直接使用 Element-Plus -->
<template>
  <el-input v-model="value" placeholder="请输入" />
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { ref } from 'vue'

const value = ref('')
</script>
```

```vue
<!-- 现在使用 useUI 获取适配后的组件 -->
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

#### Message 使用示例（消息提示和确认框）

```typescript
// 原来直接使用 Element-Plus
import { ElMessage, ElMessageBox } from 'element-plus'

// 消息提示
ElMessage.success('操作成功')
ElMessage.error({ message: '操作失败', duration: 4000 })

// 确认框
await ElMessageBox.confirm('确认删除吗？', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
})
```

```typescript
// 现在使用 useUI 获取适配后的 Message
import { useUI } from '@/hooks'

const { Message } = useUI()

// 消息提示
Message.success('操作成功')
Message.error('操作失败', { duration: 4000 })
Message.warning('警告信息')
Message.info('提示信息')

// 确认框
await Message.confirm('确认删除吗？', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
})

// 提示框
await Message.alert('操作成功', '提示', {
  confirmButtonText: '知道了',
  type: 'success'
})
```

## 切换UI方式

**注意:UI库在项目初始化时确定,不支持运行时动态切换。**

### 1. 切换内置 UI

项目内会适配几套常用UI。全局注册组件时，可额外传递`ui`，可从formora导入内置的某UIadapter。

formora会将所有组件库外部化，切换UIadapter，需要使用者自行安装对应UI库。

#### 使用 Element-Plus (默认)

```bash
npm install element-plus
```

```typescript
// main.ts
import Formora from 'formora'
import { createApp } from 'vue'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(Formora) // 默认使用 Element-Plus
app.mount('#app')
```

#### 使用 Ant Design Vue

```bash
npm install ant-design-vue
```

```typescript
// main.ts
import Formora, { AntdAdapter } from 'formora'
import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(Formora, {
  ui: AntdAdapter
})
app.mount('#app')
```

#### 使用 Arco Design

```bash
npm install @arco-design/web-vue
```

```typescript
// main.ts
import Formora, { ArcoAdapter } from 'formora'
import { createApp } from 'vue'
import '@arco-design/web-vue/dist/arco.css'

const app = createApp(App)
app.use(Formora, {
  ui: ArcoAdapter
})
app.mount('#app')
```

### 2. 自定义 UI 适配器

用户可自定义 UI 适配器，适配任意组件库或自己的组件。

#### 自定义适配器示例

```typescript
// MyCustomAdapter.ts
import type { InputProtocol, UIAdapter } from 'formora'
import { MyInput, MySelect } from 'my-ui-library'
import { defineComponent, h } from 'vue'

const MyCustomAdapter: UIAdapter = {
  Input: defineComponent((_, { slots, attrs }) => {
    const props = attrs as InputProtocol['props']

    return () =>
      h(
        MyInput,
        {
          // 根据你的组件库 API 进行适配
          value: props.modelValue,
          onInput: (e: Event) => {
            const value = (e.target as HTMLInputElement).value
            props['onUpdate:modelValue']?.(value)
          },
          placeholder: props.placeholder,
          disabled: props.disabled,
          readonly: props.readonly,
          maxlength: props.maxlength
        },
        slots
      )
  }),

  Select: defineComponent((_, { slots, attrs }) => {
    // ... 适配 Select 组件
    return () => h(MySelect, attrs, slots)
  })
}

export default MyCustomAdapter
```

#### 使用自定义适配器

```typescript
// main.ts
import Formora from 'formora'
import { createApp } from 'vue'
import MyCustomAdapter from './MyCustomAdapter'

const app = createApp(App)
app.use(Formora, {
  ui: MyCustomAdapter
})
app.mount('#app')
```

## 注意事项

1. **样式隔离**: 不同 UI 库的样式需要单独引入,formora 本身不包含任何 UI 库样式
2. **每次必须要适配uiAdapter下所有Adapter**：确保所有UI库都支持新增的组件
3. 所有组件必须通过 `useUI()` 获取，不能直接导入 UI 库组件
4. 适配器中的属性映射必须准确，确保不同 UI 库的行为一致
5. 对于不支持的属性，应该提供合理的降级方案
6. **实例方法暴露**：对于有实例方法的组件（如 Form、Table 等），必须通过 `ref` + `expose` 暴露底层组件的所有实例方法，确保外部可以调用这些方法
7. **Ant Design Vue 的 Tabs 组件特殊处理**：Tabs 会直接读取子节点 VNode 的 props，而不是等子组件渲染。因此需要在 Tabs 适配器的 slots.default 中手动修改子节点的 props，将 `label` 转换为 `tab`
8. **类型提示**: 使用 TypeScript 时,切换 UI 库后类型提示保持一致
9. **插槽适配**: 不同 UI 库的插槽名称可能不同,需要在适配器中进行映射
10. **事件适配**: 事件名称和参数可能不同,需要在适配器中统一转换为协议定义的格式
11. **外部化依赖**: formora 将所有 UI 库设置为 peerDependencies,不会打包进库中
12. 部分组件的样式适配，需要在src/style.scss中进行穿透，注意不要使用deep选择器。
13. 适配的时候，不要使用嵌套的三目运算，因为不好维护。
