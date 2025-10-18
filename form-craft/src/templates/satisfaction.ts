import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'top',
  size: 'default',
  scrollToError: true,
  submitBtn: true,
  items: [
    {
      label: '您的姓名',
      component: 'Input',
      props: {
        placeholder: '请输入您的姓名'
      },
      name: 'name',
      required: true
    },
    {
      label: '您的性别',
      component: 'Radio',
      props: {
        options: [
          {
            label: '男',
            value: 'male'
          },
          {
            label: '女',
            value: 'female'
          }
        ],
        labelKey: 'label',
        valueKey: 'value',
        mode: 'static'
      },
      name: 'gender',
      required: true
    },
    {
      label: '您的年龄',
      component: 'InputNumber',
      props: {
        placeholder: '',
        min: 1,
        max: 120,
        controlsPosition: 'right'
      },
      name: 'age',
      required: true
    },
    {
      label: '您对我们的服务满意吗？',
      component: 'Radio',
      props: {
        options: [
          {
            label: '非常满意',
            value: 5
          },
          {
            label: '满意',
            value: 4
          },
          {
            label: '一般',
            value: 3
          },
          {
            label: '不满意',
            value: 2
          },
          {
            label: '非常不满意',
            value: 1
          }
        ],
        labelKey: 'label',
        valueKey: 'value',
        api: {
          url: 'https://apifoxmock.com/m1/5213940-4880280-default/options/test',
          method: 'GET',
          params: {},
          dataPath: 'data'
        },
        disabledKey: 'disabled',
        mode: 'static'
      },
      name: 'satisfaction',
      required: true
    },
    {
      label: '改进建议',
      component: 'TextArea',
      props: {
        placeholder: '请留下您的建议'
      },
      name: 'improvementSuggestions',
      hidden: '{{ !$values.satisfaction || $values.satisfaction > 3 }}'
    },
    {
      label: '联系方式',
      component: 'Input',
      props: {
        placeholder: '请输入您的邮箱或电话'
      },
      name: 'contact',
      required: true
    }
  ],
  labelBold: false,
  hideRequiredAsterisk: false
} satisfies FormSchema
