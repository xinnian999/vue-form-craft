// server.js
import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import process from 'process';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatDeepSeek } from '@langchain/deepseek';

const app = express();
const port = process.env.PORT || 3000;

// 支持 JSON body
app.use(express.json());

// 读取文档作为上下文
const schema = fs.readFileSync('../../docs/zh/schema.md', 'utf-8')
const linkage = fs.readFileSync('../../docs/zh/linkage.md', 'utf-8')

const docs = [schema,linkage];

// 初始化 DeepSeek 模型
const model = new ChatDeepSeek({
  apiKey: process.env.API_KEY,
  model: 'deepseek-chat'
});

// Prompt 模板
const prompt = ChatPromptTemplate.fromMessages([
  ['system', '你是表单生成器，只输出 表单JSON，不要输出其他内容，每个表单项要包含 designKey，不要重复，参考文档：{context}'],
  ['human', '{input}']
]);

// POST /generateForm
app.post('/generateForm', async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ error: '缺少 input 字段' });
    }

    const context = docs.join('\n');
    const promptValue = await prompt.formatPromptValue({ input, context });

    // 调用 DeepSeek
    const response = await model.invoke(promptValue.toChatMessages());

    // 返回 JSON
    res.json({ data: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '生成失败', detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
