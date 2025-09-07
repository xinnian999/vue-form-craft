const token = `Bearer ${import.meta.env.VITE_COZE_API_KEY}`

export const runChatApi = async (data: Record<string, any>) => {

    return await fetch('/coze-api/v3/chat', {
        headers: { 'Content-Type': 'application/json', token },
        method: 'POST',
        body: JSON.stringify(data)
    })
}

