import axios from 'axios'

const generateJsonApi = async (data: Record<string, any>) => {
  const res = await axios.post('/coze-api/v3/chat', data)

  if (res.data.code === 4101) {
    return '× 请设置token'
  }

  const info = res.data.data

  await new Promise((resolve) => {
    const interval = setInterval(async () => {
      const res = await axios.get('/coze-api/v3/chat/retrieve', {
        params: {
          conversation_id: info.conversation_id,
          chat_id: info.id
        }
      })

      const { status } = res.data.data

      if (status === 'completed') {
        clearInterval(interval)
        resolve(undefined)
      }
    }, 1000)
  })

  const result = await axios.get('/coze-api/v3/chat/message/list', {
    params: {
      conversation_id: info.conversation_id,
      chat_id: info.id
    }
  })

  if (result.data.code === 0) {
    const content = result.data.data[result.data.data.length - 2].content
    const jsonStr = content.replace('```json', '').replace('```', '')
    const json = JSON.parse(jsonStr)
    return json
  }
}

export default generateJsonApi
