# 代码编辑器（CodeEditor）

## 组件标识

`component: 'CodeEditor'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| language | `'javascript' \| 'typescript' \| 'json' \| 'html' \| 'css' \| 'scss' \| 'python' \| 'java' \| 'cpp' \| 'csharp' \| 'php' \| 'go' \| 'rust' \| 'sql' \| 'markdown' \| 'xml' \| 'yaml'` | 编程语言 |
| theme | `'vs' \| 'vs-dark' \| 'hc-black'` | 编辑器主题 |
| height | `string \| number` | 编辑器高度 |
| fontSize | `number` | 字体大小 |
| tabSize | `number` | Tab 宽度 |
| lineNumbers | `'on' \| 'off' \| 'relative' \| 'interval'` | 行号显示方式 |
| wordWrap | `'on' \| 'off' \| 'wordWrapColumn' \| 'bounded'` | 自动换行策略 |
| minimap | `boolean` | 是否显示小地图 |
| readOnly | `boolean` | 只读模式 |
| onMount | `(editor: any) => void` | 编辑器挂载回调 |
| style | `Record<string, any>` | 自定义样式 |
