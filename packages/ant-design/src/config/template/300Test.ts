import type { FormSchema } from "@vue-form-craft/core";

export default {
  labelWidth: 3,
  labelAlign: 'right',
  size: 'default',
  items: Array.from({ length: 300 }).map((_, index) => ({
    label: `字段${index + 1}`,
    component: 'Input',
    props: {
      placeholder: '{{$values.name1}}'
    },
    designKey: `designKey-${index + 1}`,
    name: `name${index + 1}`
  }))
} satisfies FormSchema
