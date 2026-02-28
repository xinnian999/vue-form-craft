# 多行输入框（TextArea）

## 组件标识

`component: 'TextArea'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| placeholder | `string` | 占位符 |
| disabled | `boolean` | 禁用 |
| readonly | `boolean` | 只读 |
| clearable | `boolean` | 是否显示清空按钮 |
| maxlength | `number` | 最大长度 |
| showWordLimit | `boolean` | 是否显示字数统计 |
| autosize | `boolean \| { minRows?: number; maxRows?: number }` | 自动高度 |
| autosize.minRows | `number` | 最小行数（autosize 对象模式） |
| autosize.maxRows | `number` | 最大行数（autosize 对象模式） |
| onBlur | `(e: Event) => void` | 失焦事件 |
| onFocus | `(e: Event) => void` | 聚焦事件 |
| onChange | `(value: string) => void` | 值变更事件 |
| onInput | `(value: string) => void` | 输入事件 |
| onClear | `() => void` | 清空事件 |
| style | `Record<string, any>` | 自定义样式 |
