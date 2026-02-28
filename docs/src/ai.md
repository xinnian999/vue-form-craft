# AI 能力

`Vue Form Craft` 可以接入AI能力，来辅助用户生成表单Schema。

具备以下功能：

- 与AI助手对话，辅助生成或修改表单
- 在需要正则校验字段时，可以智能生成正则表达式
- 智能生成表单样式
- 输入框的内容可以ai生成

## 接入方式

`Vue Form Craft` 将 AI 能力接入完全交给使用者。

只需要在 `app.use(VueFormCraft, { ai })` 时注入一个通用的 **AI函数**。

`ai` 是一个函数，签名如下：

```ts
type AiGenerateParams = {
  prompt: string
  signal?: AbortSignal
}

type AiGenerateFunction = (params: AiGenerateParams) => Promise<any>
```

### 参数说明

- `prompt`：内部拼装好的提示词（包含用户需求 + 当前Schema上下文），直接传给大模型即可。
- `signal`：取消信号（用户点击“取消生成”时会触发）

### 返回值要求

原样返回模型的**文本响应**内容，AI 助手会根据场景自动解析。

## 使用示例

> 前端直接调用模型会暴露 API Key，建议仅用于本地调试或受控环境。线上环境建议走服务端代理。

```ts
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft'
import App from './App.vue'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

app.use(VueFormCraft, {
  ai: async ({ prompt, signal }) => {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-5.2',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      }),
      signal
    })

    if (!resp.ok) {
      throw new Error(`AI请求失败: ${resp.status}`)
    }

    const data = await resp.json()
    return data?.choices?.[0]?.message?.content || ''
  }
})

app.mount('#app')
```
