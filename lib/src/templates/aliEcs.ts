import type { FormSchema } from 'formora'

export default {
  labelWidth: 150,
  labelAlign: 'left',
  scrollToError: true,
  size: 'default',
  submitBtn: true,
  initialValues: {},
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
              {
                label: '包年包月',
                desc: '先付费后使用，价格优惠',
                value: 'year'
              },
              {
                label: '按量付费',
                desc: '先使用后付费，按需开通',
                value: 'postpaid'
              },
              {
                label: '抢占式实例',
                desc: '较按量计费最高可省90%',
                value: 'spot'
              }
            ],
            slots: {
              default:
                '{{({ option }) => h("div", null, [h("div", { style: "font-weight: 500;" }, option.label), option.desc ? h("div", { style: "font-size: 12px; color: #999; margin-top: 2px;" }, option.desc) : null])}}'
            }
          },
          designKey: 'design-xxxx',
          linkages: [
            {
              type: 'attr',
              target: 'payType',
              condition: '{{$values.payType === "postpaid"}}',
              path: 'alert',
              value: '按量付费实例不支持备案服务'
            },
            {
              type: 'attr',
              target: 'payType',
              condition: '{{$values.payType === "year"}}',
              path: 'alert'
            },
            {
              type: 'attr',
              target: 'payType',
              condition: '{{$values.payType === "spot"}}',
              path: 'alert',
              value:
                '使用须知：\n1. 您可以创建无保护期或者一小时保护期的抢占式实例，超过保护期后，当市场价格高于您的出价或资源供需关系变化时，抢占式实例会被自动释放，请做好数据备份工作\n2. 有状态应用，比如数据库，不宜使用抢占式实例，了解更多>\n3. 抢占式实例不支持备案服务'
            }
          ]
        }
      ]
    }
  ],
  css: '.el-radio-button__inner {\n  padding: 16px 24px;\n  border-radius: 4px;\n  border: 1px solid #dcdfe6;\n  background: #fff;\n  min-width: 160px;\n  text-align: left;\n  line-height: 1.5;\n}',
  style: {
    backgroundColor: 'rgb(245, 245, 245)'
  }
} satisfies FormSchema
