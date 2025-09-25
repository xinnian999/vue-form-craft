import bugGood from './bugGood'
import satisfaction from './satisfaction'
import formList from './formList'
import valueLinkage from './valueLinkage'
import register from './register'

export default [
  {
    label: '常见表单',
    children: [
      {
        label: '注册账号',
        schema: register,
        description: '常见的《注册账号》表单，包含了用户名、密码、确认密码等字段。 且【密码】和【确认密码】之间具备校验逻辑。手机号、邮箱都具备格式校验。'
      },
    ]
  },
  {
    label: '表单联动案例',
    children: [
      { label: '用户满意度调查', schema: satisfaction, description: '简单的用户满意度调查表单。联动效果：当用户满意度程度低时，可以输入改进建议' },
      { label: '商品购买', schema: bugGood, description: '商品购买表单。联动效果：选择商品后，将商品金额展示出来' },
      { label: '自增组件联动', schema: formList, description: '自增组件联动表单' },
      { label: '数据联动', schema: valueLinkage, description: '数据联动：当字段A输入时，字段B和C的数据会随之改变' },
    ]
  },
]
