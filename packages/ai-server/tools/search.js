import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 读取 embeddings.json
const embeddings = JSON.parse(fs.readFileSync(path.join(__dirname, 'embeddings.json'), 'utf-8'))

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
})

function cosineSimilarity(vecA, vecB) {
  let dot = 0.0
  let normA = 0.0
  let normB = 0.0
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

async function search(query) {
  // 1. 先对用户输入向量化
  const embeddingResp = await openai.embeddings.create({
    model: 'text-embedding-v4',
    input: query,
    dimensions: 1024
  })
  const queryVector = embeddingResp.data[0].embedding

  // 2. 在本地库里算相似度
  const scored = embeddings.map((item) => ({
    text: item.text,
    score: cosineSimilarity(queryVector, item.embedding)
  }))

  // 3. 取前 N 个最相似的
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 3) // 返回前 3 条
}

export default search
