# 日期选择器（DatePicker）

## 组件标识

`component: 'DatePicker'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| type | `'date' \| 'datetime' \| 'year' \| 'month' \| 'week' \| 'daterange' \| 'monthrange' \| 'datetimerange'` | 日期类型 |
| placeholder | `string` | 占位符（单值） |
| startPlaceholder | `string` | 开始占位符（范围） |
| endPlaceholder | `string` | 结束占位符（范围） |
| disabledDate | `(date: Date) => boolean` | 禁用日期函数 |
| disabled | `boolean` | 禁用 |
| clearable | `boolean` | 可清空 |
| format | `string` | 展示格式 |
| valueFormat | `string` | 值格式 |
| value-format | `string` | 值格式（Schema 常用写法） |
| onChange | `(value: string \| Date \| [string, string] \| [Date, Date]) => void` | 值变化 |
| style | `Record<string, any>` | 自定义样式 |
