// importDocs.js
import fs from 'fs'
import path from 'path'
import { pipeline } from '@xenova/transformers'

const docsDir = path.resolve('../../docs/zh')
const outputFile = './vectors.json'

async function run() {
  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  const vectors = []

  const files = fs.readdirSync(docsDir)
  for (const file of files) {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(path.join(docsDir, file), 'utf-8')
      const parts = content.split(/\n{2,}/).filter(Boolean) // 按段落切分

      for (const [i, part] of parts.entries()) {
        const output = await embedder(part, { pooling: 'mean', normalize: true })
        vectors.push({
          id: `${file}-${i}`,
          content: part,
          embedding: Array.from(output.data) // Float32Array → 普通数组
        })
        console.log(`✅ 已处理: ${file}-${i}`)
      }
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(vectors, null, 2), 'utf-8')
  console.log(`🎉 向量已保存到 ${outputFile}`)
}

run()
