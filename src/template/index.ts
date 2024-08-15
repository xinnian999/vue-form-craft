import login from './login'
import register from './register'
import article from './article'
import linkage1 from './linkage1'
import linkage2 from './linkage2'
import linkage3 from './linkage3'
import linkage4 from './linkage4'
import linkage5 from './linkage5'
import formList from './formList'
import MostTest from './300Test'
import type { templateDataType } from '@/config/commonType'

export default [
  { name: '登陆账号', schema: login, id: 'login' },
  { name: '注册账号', schema: register, id: 'register' },
  { name: '写文章', schema: article, id: 'article' },
  { name: '自增组件', schema: formList, id: 'formList' },
  { name: '联动案例1', schema: linkage1, id: 'linkage1' },
  { name: '联动案例2', schema: linkage2, id: 'linkage2' },
  { name: '联动案例3', schema: linkage3, id: 'linkage3' },
  { name: '联动案例4', schema: linkage4, id: 'linkage4' },
  { name: '联动案例5', schema: linkage5, id: 'linkage5' },
  { name: '大量表单项测试', schema: MostTest, id: 'MostTest' }
] as templateDataType
