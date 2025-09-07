import axios from "axios"

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_COZE_API_KEY}`
}

export const runChatApi = async (data: Record<string, any>) => {
    const res = await axios(
        {
            url: '/coze-api/v3/chat',
            method: 'POST',
            data,
            headers
        }
    )

    return res.data
}

