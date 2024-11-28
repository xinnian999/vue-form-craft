import type { FormSchema } from '@vue-form-craft/types'

export default {
  labelWidth: 150,
  labelAlign: 'top',
  size: 'default',
  scrollToError: true,
  items: [
    {
      label: '您的姓名',
      component: 'Input',
      props: {
        placeholder: '请输入您的姓名'
      },
      designKey: 'form-name',
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
      designKey: 'form-gender',
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
      designKey: 'form-age',
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
      designKey: 'form-satisfaction',
      name: 'satisfaction',
      required: true
    },
    {
      label: '改进建议',
      component: 'TextArea',
      props: {
        placeholder: '请留下您的建议'
      },
      designKey: 'form-improvementSuggestions',
      name: 'improvementSuggestions',
      hidden: '{{ !$values.satisfaction || $values.satisfaction > 3 }}'
    },
    {
      label: '联系方式',
      component: 'Input',
      props: {
        placeholder: '请输入您的邮箱或电话'
      },
      designKey: 'form-contact',
      name: 'contact',
      required: true
    }
  ],
  labelBold: false,
  hideRequiredAsterisk: false
} satisfies FormSchema
