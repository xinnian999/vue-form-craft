# 密码输入框（Password）

## 组件标识

`component: 'Password'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| placeholder | `string` | 占位符 |
| disabled | `boolean` | 禁用 |
| readonly | `boolean` | 只读 |
| clearable | `boolean` | 是否显示清空按钮 |
| maxlength | `number` | 最大长度 |
| showWordLimit | `boolean` | 是否显示字数统计 |
| aiPrompt | `string` | AI 生成提示词 |
| onBlur | `(e: Event) => void` | 失焦事件 |
| onFocus | `(e: Event) => void` | 聚焦事件 |
| onChange | `(value: string) => void` | 值变更事件 |
| onInput | `(value: string) => void` | 输入事件 |
| onClear | `() => void` | 清空事件 |
| style | `Record<string, any>` | 自定义样式 |
