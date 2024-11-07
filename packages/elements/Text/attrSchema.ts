import type { FormSchema } from "@vue-form-craft/types";

export default {
  size: 'small',
  labelAlign: 'top',
  items: [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '隐藏字段', component: 'Switch', name: 'hidden' },
    { label: '隐藏标签', component: 'Switch', name: 'hideLabel' },
    { label: '文本内容', component: 'Input', name: 'props.text' }
  ]
} satisfies FormSchema
