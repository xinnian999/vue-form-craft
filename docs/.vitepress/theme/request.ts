import axios from 'axios'

const request = axios.create({
  baseURL: 'https://hyl999.co/api',
  paramsSerializer: (params) => {
    return Object.keys(params)
      .map((key) => {
        if (typeof params[key] !== 'object') return `${key}=${params[key]}`
        return `${key}=${encodeURI(JSON.stringify(params[key]))}`
      })
      .join('&')
  }
})

request.interceptors.response.use((res) => {
  return res.data
})

export default request
