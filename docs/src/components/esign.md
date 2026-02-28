# 电子签名（Esign）

## 组件标识

`component: 'Esign'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| disabled | `boolean` | 是否禁用交互 |
| width | `number` | 画板宽度（px） |
| height | `number` | 画板高度（px） |
| lineWidth | `number` | 画笔粗细 |
| lineColor | `string` | 画笔颜色 |
| bgColor | `string` | 画板背景色 |
| format | `'image/png' \| 'image/jpg' \| 'image/jpeg' \| 'image/webp'` | 导出图片格式 |
| isCrop | `boolean` | 是否裁剪空白区域 |
| style | `Record<string, any>` | 自定义样式 |
