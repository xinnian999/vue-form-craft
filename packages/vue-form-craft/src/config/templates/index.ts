import bugGood from './bugGood'
import satisfaction from './satisfaction'
import type { TemplateData } from '@vue-form-craft/core'
import login from './login'
import register from './register'
import formList from './formList'
import linkage1 from './linkage1'
import linkage2 from './linkage2'
import valueLinkage from './valueLinkage'
import linkage4 from './linkage4'
import MostTest from './300Test'
import nest from './nest'


export default [
  {
    label: '常见表单',
    children: [
      { label: '登陆账号', schema: login, description: '简单的登陆表单，包含账号密码，验证码等。快速实现登录功能' },
      { label: '注册账号', schema: register, description: '简单的注册表单，包含账号密码，验证码等' },
      { label: '商品购买', schema: bugGood, id: 'bugGood' },
      { label: '用户满意度调查', schema: satisfaction, id: 'satisfaction' },
    ]
  },
  {
    label: '联动案例',
    children: [
      { label: '联动案例1', schema: linkage1, id: 'linkage1' },
      { label: '联动案例2', schema: linkage2, id: 'linkage2' },
      { label: '联动案例4', schema: linkage4, id: 'linkage4' },
      { label: '自增组件', schema: formList, id: 'formList' },
      { label: '值联动', schema: valueLinkage, id: 'valueLinkage' },
    ]
  },
  {
    label: '测试案例',
    children: [
      { label: '大量表单项测试', schema: MostTest, id: 'MostTest' },
      { label: '容器嵌套', schema: nest, id: '容器嵌套' },
    ]
  },
]
