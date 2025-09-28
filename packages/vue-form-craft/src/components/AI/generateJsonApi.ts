import axios from 'axios'
import type { Globals } from '@vue-form-craft/core'

const generateJsonApi = async ({
  data,
  signal,
  ai
}: {
  data: Record<string, any>
  signal?: AbortSignal
  ai?: Globals['ai']
}) => {
  let request = axios.create({ baseURL: ai?.baseURL ?? '/coze-api' })

  // 如果传入了token，直接请求coze官方
  if (ai?.token) {
    request = axios.create({
      baseURL: 'https://api.coze.cn',
      headers: { Authorization: `Bearer ${ai.token}` }
    })
  }

  const res = await request.post('/v3/chat', data, { signal })

  if (res.data.code === 4101) {
    throw new Error('token验证未通过')
  }

  const { conversation_id, id: chat_id } = res.data.data

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

  // 尝试解析 JSON，即使没有 ```json ``` 包裹
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

export default generateJsonApi
