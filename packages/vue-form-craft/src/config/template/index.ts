import bugGood from './bugGood'
import satisfaction from './satisfaction'
import type { TemplateData } from '@vue-form-craft/types'
import login from './login'
import register from './register'
import formList from './formList'
// import linkage1 from './linkage1'
// import linkage2 from './linkage2'
import valueLinkage from './valueLinkage'
// import linkage4 from './linkage4'
// import MostTest from './300Test'
// import nest from './nest'


export default [
  { name: '登陆账号', schema: login, id: 'login' },
  { name: '注册账号', schema: register, id: 'register' },
  { name: '商品购买', schema: bugGood, id: 'bugGood' },
  { name: '用户满意度调查', schema: satisfaction, id: 'satisfaction' },
  { name: '自增组件', schema: formList, id: 'formList' },
  { name: '值联动', schema: valueLinkage, id: 'valueLinkage' },
  // { name: '联动案例1', schema: linkage1, id: 'linkage1' },
  // { name: '联动案例2', schema: linkage2, id: 'linkage2' },
  // { name: '联动案例3', schema: linkage3, id: 'linkage3' },
  // { name: '联动案例4', schema: linkage4, id: 'linkage4' },
  // { name: '大量表单项测试', schema: MostTest, id: 'MostTest' },
  // { name: '容器嵌套', schema: nest, id: '容器嵌套' }
] satisfies TemplateData
