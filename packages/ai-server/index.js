// server.js
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const app = express()
const host = 'https://api.siliconflow.cn'
const port = process.env.PORT || 3000
const apiKey = process.env.API_KEY

// 解析 JSON body
app.use(express.json())

// 保证路径正确
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const schema = fs.readFileSync(path.join(__dirname, '../../docs/zh/schema.md'), 'utf-8')
const linkage = fs.readFileSync(path.join(__dirname, '../../docs/zh/linkage.md'), 'utf-8')
const docs = [schema, linkage]
const context = docs.join('\n')

app.get('/', (req, res) => {
  res.send('Hello AI Server!')
})

// POST /generateForm
app.post('/generateForm', async (req, res) => {
  try {
    const { input } = req.body
    if (!input) {
      return res.status(400).json({ error: '缺少 input 字段' })
    }

    // 手搓 Prompt
    const messages = [
      {
        role: 'system',
        content: `你是表单生成器，只输出严格的 JSON，不要输出其他内容。
每个表单项要包含唯一的 designKey。参考文档：${context}`
      },
      {
        role: 'user',
        content: input
      }
    ]

    let startTime = Date.now()

    // 调用本地 DeepSeek（假设兼容 OpenAI API 格式）
    const response = await fetch(`${host}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}` // 如果本地不需要认证，可以去掉
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1', // 本地模型名称
        messages
      })
    })

    console.log('总耗时', `${Math.ceil((Date.now() - startTime) / 1000)}s`)

    const data = await response.json()

    console.log('data', data)

    // 提取 AI 返回的内容
    const text = data?.choices?.[0]?.message?.content?.trim()
    if (!text) {
      return res.status(500).json({ error: '模型未返回结果' })
    }

    res.json({ data: text })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '生成失败', detail: err.message })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
