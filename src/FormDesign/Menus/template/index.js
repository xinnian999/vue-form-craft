import login from './login'
import register from './register'
import article from './article'
import linkage from './linkage'

export default [
  { name: '登陆账号', schema: login },
  { name: '注册账号', schema: register },
  { name: '写文章', schema: article },
  { name: '评分（联动案例）', schema: linkage }
]
