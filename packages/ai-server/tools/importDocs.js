import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const zhDocsDir = path.join(__dirname, '../../../docs/zh')

function readMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const result = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      result.push(...readMarkdownFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      result.push(content)
    }
  }
  return result
}

const docs = readMarkdownFiles(zhDocsDir)

async function generateEmbeddings() {
  const completion = await openai.embeddings.create({
    model: 'text-embedding-v2',
    input: docs,
    // dimensions: 1024,
    encoding_format: 'float'
  })

  // 整理成 JSON 结构
  const result = completion.data.map((item, idx) => ({
    text: docs[idx],
    embedding: item.embedding
  }))

  // 保存到本地
  const filePath = path.join(__dirname, 'embeddings.json')
  fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf-8')

  console.log(`✅ 向量已保存到 ${filePath}`)
}

generateEmbeddings().catch((err) => {
  console.error('生成失败:', err.response?.data || err.message)
})
