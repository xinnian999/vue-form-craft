# 多选框组（Checkbox）

## 组件标识

`component: 'Checkbox'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| mode | `'static' \| 'remote'` | 数据模式：静态选项/远程请求 |
| options | `Array<{ label: string; value: any; disabled?: boolean }>` | 选项列表 |
| api | `SchemaApi` | 远程模式配置 |
| api.url | `string` | 远程请求地址 |
| api.method | `'GET' \| 'POST' \| 'PUT' \| 'DELETE'` | 请求方式 |
| api.params | `Record<string, any> \| string` | 请求参数 |
| api.dataPath | `string` | 响应数据路径，默认 data |
| api.labelKey | `string` | 标签字段名，默认 label |
| api.valueKey | `string` | 值字段名，默认 value |
| api.disabledKey | `string` | 禁用字段名，默认 disabled |
| name | `string` | 字段名（用于写入 selectData） |
| disabled | `boolean` | 禁用 |
| isButtonOption | `boolean` | 按钮形式 |
| onChange | `(value: any[]) => void` | 值变化 |
| style | `Record<string, any>` | 自定义样式 |
