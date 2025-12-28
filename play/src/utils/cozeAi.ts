import axios from 'axios'
import type { AiGenerateFunction } from 'formora/dev'

const token = import.meta.env.VITE_COZE_TOKEN

console.log(token)

const botId = '7574355537379885056'

// 创建请求实例
const request = axios.create({
  baseURL: 'https://api.coze.cn',
  headers: { Authorization: `Bearer ${token}` }
})

/**
 * 使用Coze AI的实现
 * 配置参数直接在函数内部定义
 */
export const cozeAiFunction: AiGenerateFunction = async ({ prompt, signal }) => {
  // 构建消息
  const messages = []

  messages.push({
    role: 'user',
    content: prompt,
    content_type: 'text'
  })

  // 发起聊天请求
  const res = await request.post(
    '/v3/chat',
    {
      bot_id: botId,
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

  // 直接返回原始文本内容，由调用方根据提示词约定自行解析
  return content
}
