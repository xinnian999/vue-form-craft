# 提示框（Alert）

## 组件标识

`component: 'Alert'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| title | `string` | 标题 |
| description | `string` | 描述 |
| type | `'success' \| 'info' \| 'warning' \| 'error'` | 类型 |
| closable | `boolean` | 可关闭 |
| showIcon | `boolean` | 显示图标 |
| show-icon | `boolean` | 显示图标（Schema 写法兼容） |
| onClose | `() => void` | 关闭时触发 |
