import { useGlobals } from '@/hooks'

type RequestConfig = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: Record<string, any>
  headers?: Record<string, string>
}

type RequestFn = (config: RequestConfig) => Promise<any>

const createFetchRequest = (): RequestFn => {
  const fn: RequestFn = async ({ url, method, params, headers }) => {
    const isGetLike = method === 'GET'
    const search = params && isGetLike ? new URLSearchParams(params as any).toString() : ''
    const finalUrl = search ? `${url}${url.includes('?') ? '&' : '?'}${search}` : url

    const body = !isGetLike && params ? JSON.stringify(params) : undefined

    const res = await fetch(finalUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {})
      },
      body
    })

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`)
    }

    try {
      return await res.json()
    } catch (e) {
      // 非 JSON 响应时直接返回文本
      return res.text()
    }
  }

  return fn
}

const useRequest = (): RequestFn | undefined => {
  const { request } = useGlobals()

  if (request) {
    return request as RequestFn
  }

  if (typeof fetch !== 'undefined') {
    return createFetchRequest()
  }

  // 在极端环境（既无注入 request，也无 fetch）下返回 undefined，调用方需自行判空
  return undefined
}

export default useRequest
