import { ChatOpenAI } from '@langchain/openai'
import axios from 'axios'
import type { AiGenerateFunction, AiGenerateParams } from 'vue-form-craft/dev'

const model = new ChatOpenAI({
  configuration: { baseURL: 'https://elin521.cn:3002/v1' },
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  modelName: 'deepseek-ai/DeepSeek-V3.2'
})

/**
 * 使用OpenAI AI的实现
 * 将prompt传给OpenAI并原样返回响应内容
 */
export const ai: AiGenerateFunction = async ({ prompt, signal }: AiGenerateParams) => {
  try {
    const res = await model.invoke(prompt, { signal })

    const content = res.content

    if (!content) {
      throw new Error('OpenAI API返回格式异常，未找到content字段')
    }

    // 原样返回AI生成的文本内容
    return content
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error('已取消生成')
    }

    if (error?.code === 'ECONNREFUSED' || error?.message?.includes('connect')) {
      throw new Error('无法连接到OpenAI服务，请确保OpenAI服务正在运行')
    }

    throw new Error(error?.message || 'AI生成失败')
  }
}
