import axios from 'axios'
import type { AiGenerateFunction, AiGenerateParams } from 'vue-form-craft/dev'

// Ollama服务配置
const OLLAMA_BASE_URL = import.meta.env.VITE_OLLAMA_BASE_URL || 'http://localhost:11434'
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'qwen2.5-coder:latest'

// 创建请求实例
const request = axios.create({
    baseURL: OLLAMA_BASE_URL,
    timeout: 60000
})

/**
 * 使用本地Ollama AI的实现
 * 将prompt传给AI并原样返回响应内容
 */
export const localAiFunction: AiGenerateFunction = async ({ prompt, signal }: AiGenerateParams) => {
    try {
        const res = await request.post(
            '/api/generate',
            {
                model: OLLAMA_MODEL,
                prompt,
                stream: false
            },
            { signal }
        )

        // Ollama API返回格式: { response: string, ... }
        const content = res.data?.response

        if (!content) {
            throw new Error('Ollama API返回格式异常，未找到response字段')
        }

        // 原样返回AI生成的文本内容
        return content
    } catch (error: any) {
        if (axios.isCancel(error)) {
            throw new Error('已取消生成')
        }

        if (error?.code === 'ECONNREFUSED' || error?.message?.includes('connect')) {
            throw new Error('无法连接到Ollama服务，请确保Ollama服务正在运行')
        }

        throw new Error(error?.message || 'AI生成失败')
    }
}

