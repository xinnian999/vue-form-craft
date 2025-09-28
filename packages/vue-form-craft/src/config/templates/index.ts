import addressContact from './addressContact'
import bugGood from './bugGood'
import dateRangeBooking from './dateRangeBooking'
import fileUpload from './fileUpload'
import formList from './formList'
import login from './login'
import orderInvoice from './orderInvoice'
import register from './register'
import satisfaction from './satisfaction'
import searchFilter from './searchFilter'
import userProfile from './userProfile'
import valueLinkage from './valueLinkage'

export default [
  {
    label: '常见表单',
    children: [
      {
        label: '注册账号',
        schema: register,
        description:
          '常见的《注册账号》表单，包含了用户名、密码、确认密码等字段。 且【密码】和【确认密码】之间具备校验逻辑。手机号、邮箱都具备格式校验。'
      },
      {
        label: '登录',
        schema: login,
        description: '常见的《登录》表单，包含用户名、密码与“记住我”。'
      },
      {
        label: '用户信息',
        schema: userProfile,
        description: '用户基本信息表单：姓名、性别、生日、邮箱、手机号等。'
      },
      {
        label: '搜索筛选',
        schema: searchFilter,
        description: '常见的搜索筛选表单：关键词、分类、时间范围、状态。'
      },
      {
        label: '地址与联系人',
        schema: addressContact,
        description: '省市选择联动、详细地址、联系人、联系电话等。'
      },
      {
        label: '订单与发票',
        schema: orderInvoice,
        description: '订单信息与发票申请表单，包含公司发票的条件显示与校验。'
      },
      {
        label: '附件上传',
        schema: fileUpload,
        description: '多文件上传表单，限制格式与数量，并含说明。'
      },
      {
        label: '日期区间与预约',
        schema: dateRangeBooking,
        description: '预约时间段选择、人数、备注等常见场景。'
      }
    ]
  },
  {
    label: '表单联动案例',
    children: [
      {
        label: '用户满意度调查',
        schema: satisfaction,
        description: '当用户满意度程度低时，可以输入改进建议'
      },
      {
        label: '商品购买',
        schema: bugGood,
        description: '商品购买表单。选择商品后，将商品金额展示出来'
      },
      { label: '自增组件联动', schema: formList, description: '自增组件联动表单' },
      {
        label: '数据联动',
        schema: valueLinkage,
        description: '数据联动：当字段A输入时，字段B和C的数据会随之改变'
      }
    ]
  }
]
