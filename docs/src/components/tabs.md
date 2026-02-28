# 选项卡（Tabs）

## 组件标识

`component: 'Tabs'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| defaultKey | `string \| number` | 默认激活的选项卡 key |
| type | `'card' \| 'border-card' \| ''` | 选项卡风格 |
| tabPosition | `'top' \| 'right' \| 'bottom' \| 'left'` | 选项卡位置 |
| lazy | `boolean` \| 子选项卡懒加载（子项 `componentProps.lazy`） |
| items[].componentProps.lazy | `boolean` | 子选项卡是否懒加载 |
| onTabClick | `(pane: any, event: Event) => void` | 点击标签 |
| onTabChange | `(name: string \| number) => void` | 切换标签 |
| onTabRemove | `(name: string \| number) => void` | 移除标签 |
| onTabAdd | `() => void` | 新增标签 |
