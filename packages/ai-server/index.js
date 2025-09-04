// server.js
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import extractJsonFromText from './tools/extractJsonFromText.js'
import search from './tools/search.js'

const app = express()
const host = 'https://api.siliconflow.cn'
const port = process.env.PORT || 3000
const apiKey = process.env.API_KEY
const model = 'deepseek-ai/DeepSeek-V3'

app.use(express.json())

// 保证路径正确
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const schema = fs.readFileSync(path.join(__dirname, '../../docs/zh/schema.md'), 'utf-8')
const linkage = fs.readFileSync(path.join(__dirname, '../../docs/zh/linkage.md'), 'utf-8')
const context = [schema, linkage].join('\n')

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

    const topDocs = await search(input)

    console.log('topDocs:', topDocs)

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

    const startTime = Date.now()

    const response = await fetch(`${host}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ model, messages })
    })

    const data = await response.json()
    console.log('耗时:', `${Math.ceil((Date.now() - startTime) / 1000)}s`)

    const text = data?.choices?.[0]?.message?.content?.trim()
    if (!text) {
      return res.status(500).json({ error: '模型未返回结果', raw: data })
    }

    // 先提取 JSON 部分
    const extracted = extractJsonFromText(text)

    // 校验 JSON 格式
    let jsonData
    try {
      jsonData = JSON.parse(extracted)
    } catch {
      return res.status(500).json({
        error: 'AI 返回不是有效 JSON',
        raw: extracted
      })
    }

    res.json({ data: jsonData })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '生成失败', detail: err.message })
  }
})

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`)
})
