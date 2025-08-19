import type { FormSchema } from "@form-magic/core";

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label:"文本",
    props: {
      text: '这是一段文本',
    }
  },
  items: [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '隐藏字段', component: 'Switch', name: 'hidden' },
    { label: '隐藏标签', component: 'Switch', name: 'hideLabel' },
    { label: '文本内容', component: 'Input', name: 'props.text' }
  ]
} satisfies FormSchema
