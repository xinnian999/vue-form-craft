import login from './login'
import register from './register'
import article from './article'

export default [
  { name: '登陆账号', schema: login },
  { name: '注册账号', schema: register },
  { name: '写文章', schema: article }
]
