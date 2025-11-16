import axios from 'axios'
import type { AiGenerateFunction } from 'form-craft/dev'

/**
 * 使用Coze AI的实现
 * 配置参数直接在函数内部定义
 */
export const cozeAiFunction: AiGenerateFunction = async ({ prompt, context, signal }) => {
  // 配置参数（根据实际情况修改）
  const config = {
    token: import.meta.env.VITE_COZE_TOKEN,
    baseURL: '/coze-api',
    botId: '7546913648569729039'
  }

  // 创建请求实例
  let request = axios.create({ baseURL: config.baseURL })

  // 如果传入了token,直接请求coze官方
  if (config.token) {
    request = axios.create({
      baseURL: 'https://api.coze.cn',
      headers: { Authorization: `Bearer ${config.token}` }
    })
  }

  // 构建消息
  const messages = []
  if (context) {
    messages.push({
      role: 'user',
      content: JSON.stringify(context),
      content_type: 'text'
    })
  }
  messages.push({
    role: 'user',
    content: prompt,
    content_type: 'text'
  })

  // 发起聊天请求
  const res = await request.post(
    '/v3/chat',
    {
      bot_id: config.botId,
      user_id: '123456',
      additional_messages: messages
    },
    { signal }
  )

  if (res.data.code === 4101) {
    throw new Error('token验证未通过')
  }

  const { conversation_id, id: chat_id } = res.data.data

  // 轮询等待完成
  const start = Date.now()
  const timeout = 60000
  let status = ''

  while (status !== 'completed') {
    if (Date.now() - start > timeout) throw new Error('生成超时')
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const retrieveRes = await request.get('/v3/chat/retrieve', {
        params: { conversation_id, chat_id },
        signal
      })
      status = retrieveRes.data.data.status
    } catch (e: any) {
      if (axios.isCancel(e)) throw new Error('已取消生成')
      throw e
    }
  }

  // 获取消息列表
  const result = await request.get('/v3/chat/message/list', {
    params: { conversation_id, chat_id },
    signal
  })

  if (result.data.code !== 0) {
    throw new Error(`API Error: ${result.data.code}`)
  }

  const content = result.data.data.find(
    (item: any) => item.type === 'answer' && item.content_type === 'text'
  )?.content

  if (!content) {
    throw new Error('No answer found')
  }

  // 尝试解析 JSON
  const jsonStr = content
    .replace(/^```json\s*/, '')
    .replace(/```$/, '')
    .replace(/\\{\\{([^}]*)\\}\\}/g, '{{$1}}')

  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    throw new Error('AI生成错误')
  }
}

/**
 * 示例2: 使用OpenAI的实现
 */
export const createOpenAiFunction = (config: {
  apiKey: string
  baseURL?: string
  model?: string
}): AiGenerateFunction => {
  return async ({ prompt, context, signal }) => {
    const request = axios.create({
      baseURL: config.baseURL ?? 'https://api.openai.com',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    const messages: any[] = []

    if (context) {
      messages.push({
        role: 'system',
        content: `当前表单配置: ${JSON.stringify(context)}`
      })
    }

    messages.push({
      role: 'user',
      content: prompt
    })

    const response = await request.post(
      '/v1/chat/completions',
      {
        model: config.model ?? 'gpt-3.5-turbo',
        messages
      },
      { signal }
    )

    const content = response.data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No response from AI')
    }

    // 尝试解析JSON
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/)
      const jsonStr = jsonMatch ? jsonMatch[1] : content
      return JSON.parse(jsonStr)
    } catch (e) {
      // 如果不是JSON,直接返回文本
      return content
    }
  }
}

/**
 * 示例3: 自定义简单实现
 */
export const createCustomAiFunction = (
  customHandler: (prompt: string, context?: any) => Promise<any>
): AiGenerateFunction => {
  return async ({ prompt, context, signal }) => {
    // 可以在这里添加取消逻辑
    if (signal?.aborted) {
      throw new Error('已取消生成')
    }

    return customHandler(prompt, context)
  }
}
