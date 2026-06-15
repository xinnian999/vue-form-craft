# Vue Form Craft

AI 驱动的 Vue3 表单工具，核心由 `FormDesign`（可视化设计器） + `FormRender`（Schema 渲染器）组成。

- 在线体验: https://form.elin521.cn/form-design.html
- 文档: https://form.elin521.cn/

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
import axios from 'axios'
import VueFormCraft from 'vue-form-craft'

const ai = async ({ prompt, signal }) => {
  try {
    const res = await axios.post(
      '/api/ai/v1/chat/completions', // nginx代理实际请求地址，防止暴露apiKey
      {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      },
      {
        signal
      }
    )

    const content = res?.data?.choices?.[0]?.message?.content

    // 原样返回AI生成的文本内容
    return content
  } catch (error) {
    throw new Error('AI生成失败')
  }
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

## 文档部署

文档站托管在服务器（`8.141.0.39`）上，由容器化 Caddy 直接静态托管并自动签发 HTTPS 证书，线上地址 https://form.elin521.cn 。

一键构建并推送（无需登录服务器）：

```bash
pnpm docs:release
```

该命令会构建库与文档，再用 `rsync` 把 `docs/.vitepress/dist` 同步到服务器静态目录（推完即生效）。相关配置：

- `scripts/deploy-docs.sh`：构建 + 推送脚本（可用 `DEPLOY_SERVER` / `DEPLOY_PATH` 覆盖默认值）
- `deploy/form.caddy`：站点的 Caddy 配置（对应服务器 `/root/caddy/sites/form.caddy`），含 `/api/ai/*` → `code0.ai` 的反向代理
- AI 密钥在服务器 Caddy 进程的环境变量 `OPENAI_API_KEY` 中注入，不下发浏览器、不进仓库
