# Vue Form Craft

AI 驱动的 Vue3 表单工具，核心由 `FormDesign`（可视化设计器） + `FormRender`（Schema 渲染器）组成。

- 在线体验: https://xinnian999.github.io/vue-form-craft/form-design
- 官方文档: https://xinnian999.github.io/vue-form-craft/

## 核心能力

- 可视化拖拽生成表单 `JsonSchema`
- 用 `FormRender` 直接渲染 `JsonSchema`
- 支持复杂联动（JS 表达式 + data/attr 联动）
- 支持数组字段收集（`FormList`）和深层嵌套
- 支持校验规则（`required/min/max/pattern/builtin/custom/jsExpr`）
- 支持 AI 辅助生成/修改表单 Schema
- 支持扩展组件与多 UI 适配器（Element Plus / Ant Design Vue）

## 项目结构

这是一个 `pnpm workspace` 仓库：

- `lib`: 核心库源码（npm 包 `vue-form-craft`）
- `play`: 本地调试 playground
- `docs`: VitePress 文档站

## 在业务项目中使用

### 1. 安装

```bash
npm i vue-form-craft
```

### 2. 全局注册

默认使用 Element Plus 适配器（需自行安装并注册 Element Plus）：

```ts
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(VueFormCraft)
app.mount('#app')
```

如需切换为 Ant Design Vue：

```ts
import { AntdAdapter } from 'vue-form-craft'

app.use(VueFormCraft, {
  ui: AntdAdapter
})
```

### 3. 使用 `FormRender`

```vue
<template>
  <FormRender v-model="formValues" :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '用户名',
      name: 'username',
      component: 'Input',
      required: true,
      componentProps: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '密码',
      name: 'password',
      component: 'Password',
      required: true,
      componentProps: {
        placeholder: '请输入密码'
      }
    }
  ]
}

const onFinish = () => {
  alert(JSON.stringify(formValues.value, null, 2))
}
</script>
```

### 4. 使用 `FormDesign`

```vue
<template>
  <div style="width: 100vw; height: 100vh">
    <FormDesign />
  </div>
</template>
```

## AI 接入（可选）

通过 `app.use(VueFormCraft, { ai })` 注入一个通用函数即可：

```ts
import VueFormCraft from 'vue-form-craft'
import type { AiGenerateFunction } from 'vue-form-craft'

const ai: AiGenerateFunction = async ({ prompt, signal }) => {
  const resp = await fetch('/api/ai/generate-schema', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
    signal
  })
  const data = await resp.json()
  return data.content
}

app.use(VueFormCraft, { ai })
```

## 开发仓库

```bash
# playground
pnpm dev

# 构建库
pnpm build

# 单元测试
pnpm test

# 文档站
pnpm docs:dev
pnpm docs:build
```

## 文档入口

- 快速开始: https://xinnian999.github.io/vue-form-craft/zh/use
- Schema 协议: https://xinnian999.github.io/vue-form-craft/zh/schema
- 表单联动: https://xinnian999.github.io/vue-form-craft/zh/linkage
- AI 能力: https://xinnian999.github.io/vue-form-craft/zh/ai
