# 颜色选择器（ColorPicker）

## 组件标识

`component: 'ColorPicker'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| disabled | `boolean` | 禁用 |
| showAlpha | `boolean` | 显示透明度 |
| colorFormat | `'hex' \| 'rgb' \| 'hsl' \| 'hsv'` | 颜色格式 |
| onChange | `(value: string) => void` | 颜色确认变化 |
| onActiveChange | `(value: string) => void` | 拖动实时变化 |
| style | `Record<string, any>` | 自定义样式 |
