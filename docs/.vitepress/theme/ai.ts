import axios from 'axios'
import type { AiGenerateFunction, AiGenerateParams } from 'vue-form-craft/dev'

export const ai: AiGenerateFunction = async ({ prompt, signal }: AiGenerateParams) => {
  try {
    const res = await axios.post(
      '/api/ai/v1/chat/completions',
      {
        model: 'deepseek-ai/DeepSeek-V3.2',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      },
      {
        signal
      }
    )

    const content = res?.data?.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('OpenAI API返回格式异常，未找到content字段')
    }

    // 原样返回AI生成的文本内容
    return content
  } catch (error: any) {
    if (axios.isCancel(error) || error?.code === 'ERR_CANCELED') {
      throw new Error('已取消生成')
    }

    if (error?.code === 'ECONNREFUSED' || error?.message?.includes('connect')) {
      throw new Error('无法连接到OpenAI服务，请确保OpenAI服务正在运行')
    }

    throw new Error(error?.message || 'AI生成失败')
  }
}
