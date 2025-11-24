import rulesSchema from '@/components/customComponents/Rules/schema'
import { formAttrSchema } from '@/config'
import * as elements from '@/elements'
import type { FormElement } from '@/types'
import addressContact from './addressContact'
import advancedLinkage from './advancedLinkage'
import bugGood from './bugGood'
import dateRangeBooking from './dateRangeBooking'
import eventLinkage from './eventLinkage'
import fileUpload from './fileUpload'
import formList from './formList'
import funcAttr from './funcAttr'
import login from './login'
import orderInvoice from './orderInvoice'
import register from './register'
import satisfaction from './satisfaction'
import searchFilter from './searchFilter'
import userProfile from './userProfile'
import valueLinkage from './valueLinkage'

const elementConfigs = Object.keys(elements)
  .map((key) => {
    const element = (elements as Record<string, FormElement>)[key]
    let order = element.order
    if (element.type === 'layout') {
      order += 100
    }
    if (element.type === 'assist') {
      order += 200
    }
    return {
      label: element.title,
      schema: element.attrSchema,
      description: '',
      order,
      type: element.type
    }
  })
  .sort((a, b) => a.order - b.order)

export {
  addressContact,
  advancedLinkage,
  bugGood,
  dateRangeBooking,
  eventLinkage,
  fileUpload,
  formList,
  login,
  orderInvoice,
  register,
  satisfaction,
  searchFilter,
  userProfile,
  valueLinkage
}

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
    label: '功能案例',
    children: [{ label: '函数传递', schema: funcAttr, description: '支持函数作为字段值传递' }]
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
      },
      {
        label: '高级联动',
        schema: advancedLinkage,
        description:
          '高级联动：不仅可以修改数据,还可以动态修改字段的 schema 配置（如 label、props、hidden、required 等）'
      },
      {
        label: '事件函数联动',
        schema: eventLinkage,
        description:
          '事件函数联动：通过 onChange、onBlur、onInput 等事件处理器实现复杂的联动逻辑，可调用 $instance 的所有方法'
      }
    ]
  },
  {
    label: '组件配置表单',
    children: [
      {
        label: '表单配置',
        schema: formAttrSchema,
        description: ''
      },
      {
        label: '校验规则配置',
        schema: rulesSchema,
        description: ''
      },
      ...elementConfigs
    ]
  }
]
