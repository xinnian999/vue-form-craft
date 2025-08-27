import 'dotenv/config'
import fs from 'fs'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatDeepSeek } from '@langchain/deepseek'
import process from 'process'

const schema = fs.readFileSync('../../docs/zh/schema.md', 'utf-8')

const docs = [schema]

const model = new ChatDeepSeek({
  apiKey: process.env.API_KEY,
  model: 'deepseek-chat'
})

const prompt = ChatPromptTemplate.fromMessages([
  ['system', '你是表单生成器，只输出 vue-form-craft JSON，参考文档：{context}'],
  ['human', '{input}']
])

async function generateForm(input) {
  // 简单检索：直接拼接 docs 作为 context
  const context = docs.join('\n')
  const promptValue = await prompt.formatPromptValue({ input, context })
  console.log('Prompt:', promptValue.toChatMessages())
  const response = await model.invoke(promptValue.toChatMessages())
  console.log('AI 返回 JSON:', response.text)
}

generateForm('生成一个注册表单，包含用户名、密码、邮箱，密码至少 6 位')