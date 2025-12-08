import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  initialValues: {
    invoiceType: 'personal'
  },
  items: [
    {
      label: '订单号',
      name: 'orderNo',
      component: 'Input',
      props: { placeholder: '请输入订单号' },
      required: true
    },
    {
      label: '订单金额(元)',
      name: 'amount',
      component: 'InputNumber',
      props: { min: 0, 'controls-position': 'right', placeholder: '' },
      required: true
    },
    {
      label: '发票类型',
      name: 'invoiceType',
      component: 'Radio',
      props: {
        options: [
          { label: '个人', value: 'personal' },
          { label: '公司', value: 'company' }
        ],
        labelKey: 'label',
        valueKey: 'value',
        mode: 'static'
      },
      required: true
    },
    {
      label: '公司名称',
      name: 'companyName',
      component: 'Input',
      props: { placeholder: '请输入公司名称' },
      hidden: "{{ $values.invoiceType !== 'company' }}"
    },
    {
      label: '纳税人识别号',
      name: 'taxpayerNo',
      component: 'Input',
      props: { placeholder: '请输入纳税人识别号' },
      hidden: "{{ $values.invoiceType !== 'company' }}",
      rules: [
        {
          type: 'pattern',
          value: '^[0-9A-Z]{15,20}$',
          message: '请输入15-20位有效识别号',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '备注',
      name: 'remark',
      component: 'TextArea',
      props: { placeholder: '可填写备注信息' }
    }
  ]
} satisfies FormSchema
