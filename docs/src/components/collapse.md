# 折叠面板（Collapse）

## 组件标识

`component: 'Collapse'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| accordion | `boolean` | 手风琴模式 |
| checked | `boolean` \| 子面板默认展开（子项 `componentProps.checked`） |
| items[].componentProps.checked | `boolean` | 子面板默认是否展开 |
| onChange | `(value: string \| number \| Array<string \| number>) => void` | 面板切换回调 |
