# AI 助手

《Form Craft》内置了 **AI 助手**，基于 [扣子平台](https://www.coze.cn/) 搭建，用户可以 **免费使用**。

## 获取 Token

1. 打开 [扣子平台](https://www.coze.cn/)，注册账号。
2. 前往 [授权页面](https://www.coze.cn/open/oauth/pats)，创建一个 **个人访问令牌 (PAT)**，即可获得 Token，格式类似：`pat_xxxxxxxxxxx`。

## 使用方法

在全局注册时，可以通过 `ai.token` 或 `ai.baseURL` 进行配置，二者任选其一：

- **token**：优先级更高。传入 Token 后，将直接请求扣子官方接口。但需注意，Token 会暴露在浏览器中，存在安全风险，请谨慎使用。
- **baseURL**：用于配置 **自建代理服务器** 转发请求至扣子官方接口。此方式不会在浏览器暴露 Token，**推荐在生产环境中使用**。

### 示例

```ts
import ElementPlus from 'element-plus'
import VueFormCraft from 'formora'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(router)
app.use(VueFormCraft, {
  ai: {
    token: 'pat_xxxxxxxxxxx'
    // 推荐在生产环境改用代理：
    // baseURL: 'http://localhost:3000'
  }
})
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
```
