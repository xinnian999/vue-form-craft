import axios from 'axios'

const request = axios.create({
  baseURL: 'https://hyl999.co/api'
})

request.interceptors.response.use((res) => {
  return res.data
})

export default request
