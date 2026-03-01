# 下拉选择框（Select）

## 组件标识

`component: 'Select'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| mode | `'static' \| 'remote'` | 数据模式：静态选项/远程请求 |
| options | `Array<{ label: string; value: any; disabled?: boolean }>` | 静态选项 |
| api | `SchemaApi` | 远程模式配置 |
| api.url | `string` | 远程请求地址 |
| api.method | `'GET' \| 'POST' \| 'PUT' \| 'DELETE'` | 请求方式 |
| api.params | `Record<string, any> \| string` | 请求参数 |
| api.dataPath | `string` | 响应数据路径，默认 data |
| api.labelKey | `string` | 标签字段名，默认 label |
| api.valueKey | `string` | 值字段名，默认 value |
| api.disabledKey | `string` | 禁用字段名，默认 disabled |
| name | `string` | 字段名（用于写入 selectData） |
| placeholder | `string` | 占位符 |
| disabled | `boolean` | 禁用 |
| multiple | `boolean` | 多选模式 |
| onChange | `(value: any) => void` | 值变更 |
| onBlur | `(e: Event) => void` | 失焦 |
| onFocus | `(e: Event) => void` | 聚焦 |
| onInput | `(value: any) => void` | 输入事件 |
| onClear | `() => void` | 清空 |
| style | `Record<string, any>` | 自定义样式 |
