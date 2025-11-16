# AI 功能使用指南

## 概述

Vue Form Craft 支持用户自定义注入 AI 功能，可以在设计器中通过 AI 对话生成或修改表单。

## 快速开始

### 1. 安装依赖

```bash
npm install vue-form-craft
```

### 2. 注入 AI 函数

在 `main.ts` 中注入自定义的 AI 函数：

```typescript
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft'
import App from './App.vue'

const app = createApp(App)

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

## AI 函数参数说明

```typescript
type AiGenerateParams = {
  prompt: string // 用户输入的提示词
  context?: Record<string, any> // 上下文数据（如当前表单 schema）
  signal?: AbortSignal // 取消信号，用于中断请求
}
```

## 使用示例

### 示例 1：使用 Coze AI

```typescript
import { createCozeAiFunction } from 'vue-form-craft/utils/aiExamples'

app.use(VueFormCraft, {
  ai: createCozeAiFunction({
    token: 'your-coze-token', // Coze API Token
    botId: '7546913648569729039' // Bot ID
  })
})
```

### 示例 2：使用 OpenAI

```typescript
import { createOpenAiFunction } from 'vue-form-craft/utils/aiExamples'

app.use(VueFormCraft, {
  ai: createOpenAiFunction({
    apiKey: 'your-openai-key',
    model: 'gpt-4'
  })
})
```

### 示例 3：自定义后端实现

```typescript
app.use(VueFormCraft, {
  ai: async ({ prompt, context, signal }) => {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        currentSchema: context
      }),
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

## 在设计器中使用

1. 打开 FormDesign 组件
2. 点击右侧的 AI 图标
3. 输入你的需求，例如：
   - "添加一个用户注册表单，包含用户名、邮箱、密码"
   - "给表单添加一个地址选择功能"
   - "修改密码字段，要求至少 8 位"
4. AI 会基于当前表单生成新的配置
5. 生成的表单会自动应用到设计器中

## 错误处理

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

## 最佳实践

1. **支持取消操作**：使用 `AbortSignal` 支持用户取消长时间的 AI 生成
2. **错误提示友好**：捕获错误并返回用户友好的提示信息
3. **上下文传递**：充分利用 `context` 参数传递当前表单状态
4. **结果校验**：对 AI 返回的结果进行校验，确保符合 FormSchema 格式
5. **超时控制**：设置合理的超时时间
6. **安全性**：不要在前端暴露 API Key，建议通过后端代理

## 高级用法

### 使用 AiHelper 工具类

```typescript
import { createAiHelper } from 'vue-form-craft'

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

## 未来规划

- **输入框 AI 辅助**：在文本输入框中集成 AI 补全功能
- **校验规则生成**：根据字段描述自动生成合适的校验规则
- **表单优化建议**：AI 分析表单结构并提供优化建议
- **多语言支持**：AI 自动翻译表单标签和提示文本

## 常见问题

### Q: AI 功能未配置怎么办？

A: 如果没有注入 AI 函数，点击 AI 图标后会提示"AI功能未配置,请在app.use时注入ai函数"。

### Q: 如何取消 AI 生成？

A: 在生成过程中，可以点击取消按钮，组件会通过 `AbortSignal` 中断请求。

### Q: AI 返回的格式不对怎么办？

A: 确保你的 AI 服务返回的是符合 FormSchema 格式的 JSON 对象。可以在 AI 函数中添加格式校验和转换逻辑。

## 参考资料

- [AI_ARCHITECTURE.md](../AI_ARCHITECTURE.md) - 详细的架构文档
- [aiExamples.ts](./src/utils/aiExamples.ts) - AI 接口实现示例
- [aiHelper.ts](./src/utils/aiHelper.ts) - AI 辅助工具类源码
