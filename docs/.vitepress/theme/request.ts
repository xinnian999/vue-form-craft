import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: 'http://101.42.108.39:7777',
  paramsSerializer: (params) => {
    return Object.keys(params)
      .map((key) => {
        if (typeof params[key] !== 'object') return `${key}=${params[key]}`
        return `${key}=${encodeURI(JSON.stringify(params[key]))}`
      })
      .join('&')
  }
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    ElMessage.error(err.message)
  }
)

export default request
