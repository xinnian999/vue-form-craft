import type { FormSchema } from "@vue-form-craft/types";

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '评分',
      component: 'Rate',
      props: {
        max: 5,
        'allow-half': true
      },
      designKey: 'form-Lx4g',
      name: 'rate',
      required: true
    },
    {
      label: '差评原因',
      component: 'TextArea',
      props: {
        autocomplete: 'off',
        showWordLimit: true,
        type: 'textarea',
        autosize: {
          minRows: 4,
          maxRows: 999
        },
        placeholder: '请输入...'
      },
      designKey: 'form-XyJs',
      name: 'reason',
      hidden: '{{!$values.rate||$values.rate>3}}'
    }
  ]
} satisfies FormSchema
