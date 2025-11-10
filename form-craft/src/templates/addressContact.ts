import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '省份',
      name: 'province',
      component: 'Select',
      props: {
        placeholder: '请选择省份',
        options: [
          { label: '浙江省', value: 'zhejiang' },
          { label: '江苏省', value: 'jiangsu' },
          { label: '广东省', value: 'guangdong' }
        ],
        labelKey: 'label',
        valueKey: 'value',
        mode: 'static',
        clearable: true
      },
      required: true,
    },
    {
      label: '城市',
      name: 'city',
      component: 'Select',
      props: {
        placeholder: '请选择城市',
        options: [
          { label: '杭州', value: 'hangzhou', province: 'zhejiang' },
          { label: '宁波', value: 'ningbo', province: 'zhejiang' },
          { label: '苏州', value: 'suzhou', province: 'jiangsu' },
          { label: '南京', value: 'nanjing', province: 'jiangsu' },
          { label: '广州', value: 'guangzhou', province: 'guangdong' },
          { label: '深圳', value: 'shenzhen', province: 'guangdong' }
        ],
        labelKey: 'label',
        valueKey: 'value',
        mode: 'static',
        clearable: true,
        disabled: "{{ !$values.province }}"
      },
      hidden: "{{ !$values.province }}",
      required: true,
    },
    {
      label: '详细地址',
      name: 'address',
      component: 'Input',
      props: { placeholder: '{{ $values.city ? "请输入\u8BE6\u7EC6\u5730\u5740" : "请先选择省份/城市" }}' },
      required: true,
    },
    {
      label: '联系人',
      name: 'contact',
      component: 'Input',
      props: { placeholder: '请输入联系人姓名' },
      required: true,
    },
    {
      label: '联系电话',
      name: 'phone',
      component: 'Input',
      props: { placeholder: '请输入联系方式', maxlength: 11 },
      rules: [
        { type: 'pattern', value: '^1[3-9]\\d{9}$', message: '请输入有效的手机号', trigger: 'blur' }
      ],
      required: true,
    }
  ]
} satisfies FormSchema
