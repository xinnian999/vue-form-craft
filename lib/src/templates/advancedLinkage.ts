import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  initialValues: {
    hasDiscount: false
  },
  items: [
    {
      label: '商品类型',
      name: 'productType',
      component: 'Select',
      props: {
        placeholder: '请选择商品类型',
        mode: 'static',
        options: [
          { label: '电子产品', value: 'electronics' },
          { label: '服装', value: 'clothing' },
          { label: '食品', value: 'food' }
        ]
      },
      required: true,
      linkages: [
        {
          target: 'productName',
          path: 'label',
          type: 'attr',
          value:
            "{{ $values.productType === 'electronics' ? '电子产品名称' : $values.productType === 'clothing' ? '服装名称' : '食品名称' }}"
        },
        {
          target: 'productName',
          path: 'props.placeholder',
          type: 'attr',
          value:
            "{{ $values.productType === 'electronics' ? '请输入电子产品名称' : $values.productType === 'clothing' ? '请输入服装名称' : '请输入食品名称' }}"
        },
        {
          target: 'specs',
          path: 'hidden',
          type: 'attr',
          value: '{{ !$values.productType }}'
        },
        {
          target: 'warranty',
          path: 'hidden',
          type: 'attr',
          value: "{{ $values.productType !== 'electronics' }}"
        }
      ]
    },
    {
      label: '商品名称',
      name: 'productName',
      component: 'Input',
      props: {
        placeholder: '请输入商品名称'
      },
      required: true
    },
    {
      label: '规格',
      name: 'specs',
      component: 'Input',
      props: {
        placeholder: '请输入规格'
      },
      hidden: true
    },
    {
      label: '保修期(月)',
      name: 'warranty',
      component: 'InputNumber',
      props: {
        min: 0,
        max: 60,
        placeholder: '请输入保修期'
      },
      hidden: true,
      help: '仅电子产品需要填写'
    },
    {
      label: '是否打折',
      name: 'hasDiscount',
      component: 'Switch',
      linkages: [
        {
          target: 'discount',
          path: 'hidden',
          type: 'attr',
          value: '{{ !$values.hasDiscount }}'
        },
        {
          target: 'discount',
          type: 'data',
          condition: '{{ !$values.hasDiscount }}',
          value: undefined
        },
        {
          target: 'finalPrice',
          path: 'props.disabled',
          type: 'attr',
          value: '{{ $values.hasDiscount }}'
        }
      ]
    },
    {
      label: '折扣(%)',
      name: 'discount',
      component: 'InputNumber',
      props: {
        min: 1,
        max: 99,
        placeholder: '请输入折扣'
      },
      hidden: true
    },
    {
      label: '原价',
      name: 'originalPrice',
      component: 'InputNumber',
      props: {
        min: 0,
        precision: 2,
        placeholder: '请输入原价'
      },
      required: true,
      linkages: [
        {
          target: 'finalPrice',
          type: 'data',
          condition: '{{ $values.hasDiscount && $values.discount && $values.originalPrice }}',
          value: '{{ ($values.originalPrice * $values.discount / 100).toFixed(2) }}'
        }
      ]
    },
    {
      label: '最终价格',
      name: 'finalPrice',
      component: 'InputNumber',
      props: {
        min: 0,
        precision: 2,
        placeholder: '自动计算'
      },
      required: true,
      help: '打折时自动计算，不打折时手动输入'
    }
  ]
} satisfies FormSchema
