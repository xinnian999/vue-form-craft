# 上传（Upload）

## 组件标识

`component: 'Upload'`

## componentProps

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| disabled | `boolean` | 是否禁用 |
| action | `string` | 上传接口地址 |
| name | `string` | 文件字段名 |
| headers | `Record<string, any>` | 请求头 |
| data | `Record<string, any>` | 额外请求参数 |
| withCredentials | `boolean` | 是否携带 Cookie |
| multiple | `boolean` | 是否支持多选 |
| accept | `string` | 可接受文件类型 |
| btnText | `string` | 上传按钮文本 |
| tip | `string` | 上传提示文案 |
| limit | `number` | 最大上传数量 |
| drag | `boolean` | 是否启用拖拽上传 |
| showFileList | `boolean` | 是否显示文件列表 |
| listType | `'text' \| 'picture' \| 'picture-card'` | 列表展示类型 |
| onChange | `(fileList: any[]) => void` | 文件列表变化回调 |
| style | `Record<string, any>` | 自定义样式 |
