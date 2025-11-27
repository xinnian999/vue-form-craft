import type { FormSchema } from 'formora'

export default {
  labelWidth: 150,
  labelAlign: 'left',
  scrollToError: true,
  size: 'default',
  submitBtn: true,
  initialValues: {},
  css: `
/* 阿里云 ECS 风格样式 */
.el-radio-button {
  margin-right: 0 !important;
}

.el-radio-button__inner {
  padding: 16px 24px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background: #fff;
  min-width: 160px;
  text-align: left;
  line-height: 1.5;
}

.el-radio-button__original-radio:checked + .el-radio-button__inner {
  border-color: #409eff;
  background-color: #ecf5ff;
  box-shadow: 0 0 0 1px #409eff;
}

.el-radio-button:hover .el-radio-button__inner {
  border-color: #409eff;
}
  `,
  items: [
    {
      name: 'form-pBQE',
      component: 'Card',
      props: {
        header: ''
      },
      designKey: 'design-2QJZ',
      children: [
        {
          label: '付费类型',
          name: 'payType',
          component: 'Radio',
          props: {
            mode: 'static',
            optionType: 'button',
            direction: 'horizontal',
            space: 16,
            options: [
              { label: '包年包月', desc: '先付费后使用，价格优惠', value: 'year' },
              { label: '按量付费', desc: '先使用后付费，按需开通', value: 'postpaid' },
              { label: '抢占式实例', desc: '较按量计费最高可省90%', value: 'spot' }
            ]
          },
          designKey: 'design-xxxx',
          alert: '按量付费实例不支持备案服务'
        }
      ]
    }
  ],
  style: {
    backgroundColor: 'rgb(245, 245, 245)'
  }
} satisfies FormSchema
