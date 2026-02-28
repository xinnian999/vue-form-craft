# 自增容器（FormList）

## 组件标识

`component: 'FormList'`

## componentProps

| 参数名      | 类型                                     | 说明                   |
| ----------- | ---------------------------------------- | ---------------------- |
| placeholder | `string`                                 | 占位提示               |
| disabled    | `boolean`                                | 是否禁用               |
| mode        | `'table' \| 'card' \| 'inline'`          | 展示模式               |
| title       | `string`                                 | 新增按钮/卡片标题前缀  |
| minLines    | `number`                                 | 最小行数               |
| maxLines    | `number`                                 | 最大行数               |
| allowAdd    | `boolean`                                | 是否允许新增行         |
| allowReduce | `boolean`                                | 是否允许删除行         |
| getNewItem  | `(index: number) => Record<string, any>` | 新增行默认数据生成函数 |
| style       | `Record<string, any>`                    | 自定义样式             |
