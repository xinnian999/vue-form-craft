# 数字输入框（InputNumber）

## 组件标识

`component: 'InputNumber'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| disabled | `boolean` | 禁用 |
| readonly | `boolean` | 只读 |
| min | `number` | 最小值 |
| max | `number` | 最大值 |
| step | `number` | 步长 |
| onChange | `(value: number \| undefined) => void` | 值变化 |
| onBlur | `(e: Event) => void` | 失焦 |
| onFocus | `(e: Event) => void` | 聚焦 |
| style | `Record<string, any>` | 自定义样式 |
