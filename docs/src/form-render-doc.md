# FormRender 表单渲染器

## 简介

FormRender 是 vue-form-craft 的渲染组件。

::: demo expand

demo/FormRender.vue

:::

## Props

| 参数名        | 类型         | 默认值 | 描述                                           |
| ------------- | ------------ | ------ | ---------------------------------------------- |
| v-model       | `object`     | {}     | 表单数据对象，双向绑定                         |
| schema        | `FormSchema` | —      | 表单JsonSchema配置                             |
| schemaContext | `object`     | {}     | 传递给JsonSchema额外的 [联动变量](/linkage) |
| read          | `boolean`    | false  | 阅读模式                                       |

## Event

| 参数名      | 类型                                  | 描述 |
| ----------- | ------------------------------------- | ---- |
| change      | `(values) => void`                    | 表单值变化时触发 |
| finish      | `(values) => void`                    | 点击提交且校验通过时触发 |
| failed      | `(errors) => void`                    | 点击提交且校验失败时触发 |
| reset       | `() => void`                          | 点击重置按钮后触发 |
| fieldChange | `(path: string, value: any) => void`  | 单字段变化时触发 |

## Exposes

| 名称             | 类型                                                | 描述 |
| ---------------- | --------------------------------------------------- | ---- |
| getSchema        | `() => FormSchema`                                  | 获取当前 Schema |
| getSchemaContext | `() => Record<string, any> \| undefined`            | 获取联动上下文 |
| getDesign        | `() => boolean \| undefined`                        | 获取是否设计模式 |
| getRead          | `() => boolean \| undefined`                        | 获取是否阅读模式 |
| getSelectData    | `() => Record<string, Record<string, any>>`         | 获取选择类组件选中项数据 |
| getContext       | `() => Record<string, any>`                         | 获取联动上下文（运行态） |
| getValues        | `() => Record<string, any>`                         | 获取表单值 |
| setValues        | `(values: Record<string, any>) => void`             | 批量设置表单值 |
| getFieldValue    | `(path: string) => any`                             | 获取单字段值 |
| setFieldValue    | `(path: string, value: any) => void`                | 设置单字段值 |
| updateSelectData | `(key: string, value: Record<string, any>) => void` | 更新选择类组件选中项数据 |
| setFieldAttr     | `(name: string, path: string, value: any) => void`  | 动态设置字段属性 |
| validate         | `() => FormValidationResult \| undefined`           | 执行校验 |
| resetFields      | `(names?: string[]) => void`                        | 重置字段（不传则重置全部） |
| submit           | `() => void`                                        | 触发提交流程 |
