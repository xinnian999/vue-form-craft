import axios from 'axios'

/**
 * 轮询获取 AI 消息状态，直到完成或超时
 */
const pollRetrieve = async ({
  conversation_id,
  chat_id,
  timeout = 60000,
  interval = 1000,
  signal
}: {
  conversation_id: string
  chat_id: string
  timeout?: number
  interval?: number
  signal?: AbortSignal
}) => {
  const start = Date.now()
  let status = ''

  while (status !== 'completed') {
    if (Date.now() - start > timeout) throw '生成超时'
    await new Promise((resolve) => setTimeout(resolve, interval))
    try {
      const res = await axios.get('/vfc-ai-api/v3/chat/retrieve', {
        params: { conversation_id, chat_id },
        signal
      })
      status = res.data.data.status
    } catch (e) {
      throw '已取消生成'
    }
  }
}

/**
 * 生成 JSON 数据
 */
const generateJsonApi = async (data: Record<string, any>, signal?: AbortSignal) => {
  // 发起聊天请求
  const res = await axios.post('/vfc-ai-api/v3/chat', data, { signal })

  if (res.data.code === 4101) {
    throw '请设置token'
  }

  const info = res.data.data

  // 轮询直到完成
  await pollRetrieve({
    conversation_id: info.conversation_id,
    chat_id: info.id,
    signal
  })

  // 获取消息列表
  const result = await axios.get('/vfc-ai-api/v3/chat/message/list', {
    params: { conversation_id: info.conversation_id, chat_id: info.id },
    signal
  })

  if (result.data.code !== 0) {
    throw `API Error: ${result.data.code}`
  }

  const content = result.data.data.find(
    (item: any) => item.type === 'answer' && item.content_type === 'text'
  )?.content

  if (!content) {
    throw 'No answer found'
  }

  // 尝试解析 JSON，即使没有 ```json ``` 包裹
  let jsonStr = content
  jsonStr = jsonStr
    .replace(/^```json\s*/, '')
    .replace(/```$/, '')
    .replace(/\\{\\{([^}]*)\\}\\}/g, '{{$1}}')

  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    throw 'AI生成错误'
  }
}

export default generateJsonApi
