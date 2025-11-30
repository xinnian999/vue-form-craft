import type { FormSchema } from 'formora'

export default {
  labelWidth: 150,
  labelAlign: 'left',
  scrollToError: true,
  size: 'default',
  submitBtn: true,
  initialValues: {
    payType: 'year',
    region: 'value1'
  },
  items: [
    {
      name: 'form-pBQE',
      designKey: 'design-2QJZ',
      component: 'Card',
      props: {
        header: ''
      },
      children: [
        {
          label: '付费类型',
          name: 'payType',
          designKey: 'design-xxxx',
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
                '{{ ({ option }) => {\n  return h("div", null, [h("div", { style: "font-weight: 500;" }, option.label), option.desc ? h("div", { style: "font-size: 12px; margin-top: 2px;",class:\'desc\' }, option.desc) : null])\n} }}'
            }
          },
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
                '使用须知：\n1. 您可以创建无保护期或者一小时保护期的抢占式实例，超过保护期后，当市场价格高于您的出价或资源供需关系变化时，抢占式实例会被自动释放，请做好数据备份工作\n2. 有状态应用，比如数据库，不宜使用抢占式实例\n3. 抢占式实例不支持备案服务'
            }
          ]
        },
        {
          label: '地域',
          name: 'region',
          designKey: 'design-XXsU',
          alert:
            '实例创建之后地域将无法更改，不同地域的实例之间内网互不相通；距离实例所在地域越近，对实例访问速度越快',
          component: 'Radio',
          props: {
            mode: 'static',
            options: [
              {
                label: '华北1 (北京)',
                value: 'value1'
              },
              {
                label: '华北2 (青岛)',
                value: 'value2'
              }
            ],
            optionType: 'button',
            direction: 'horizontal',
            space: 20
          }
        }
      ]
    }
  ],
  styleBlock:
    '.el-radio-button__inner {\n  padding: 12px 18px;\n  background: #fff;\n  text-align: left;\n  line-height: 1.5;\n\n  .desc{\n    color:#999\n  }\n}\n\n.is-active{\n  .desc{\n    color:#eee\n  }\n}\n\n.form-item-alert{\n  white-space: pre-wrap;\n}',
  style: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
} satisfies FormSchema
