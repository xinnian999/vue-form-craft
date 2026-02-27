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
| schemaContext | `object`     | {}     | 传递给JsonSchema额外的 [联动变量](/zh/linkage) |
| read          | `boolean`    | false  | 阅读模式                                       |

## Event

| 参数名 | 类型               | 描述                           |
| ------ | ------------------ | ------------------------------ |
| finish | `(values) => void` | 点击提交按钮，且校验通过时触发 |
| failed | `(values) => void` | 点击提交按钮，且校验失败时触发 |

## Exposes

| 名称                | 类型                                                | 描述                                                                              |
| ------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------- |
| schema              | `FormSchema`                                        | 表单Schema配置，纯JSON，用于描述表单结构                                          |
| schemaContext       | `object`                                            | Schema自定义的 [联动变量](/zh/linkage)                                            |
| read                | `boolean`                                           | 是否处于阅读模式                                                                  |
| formValues          | `object`                                            | 表单值                                                                            |
| selectData          | `object`                                            | 选择类组件的数据源                                                                |
| initialValues       | `object`                                            | 表单初始值                                                                        |
| context             | `object`                                            | 表单联动变量                                                                      |
| updateSelectData    | `(key: string, value: Record<string, any>) => void` | 更新**选择类组件的数据源**的方法                                                  |
| updateInitialValues | ` (values: Record<string, any>) => void`            | 更新**表单初始值**的方法                                                          |
| validate            | ` () => Promise<boolean>`                           | 校验表单                                                                          |
| resetFields         | `name[] => void`                                    | 接收一个name数组，例如`['name','age']` 来重置一组字段为初始值，不传会重置所有字段 |
| submit              | `() => void`                                        | 手动提交表单，触发校验，校验通过后会触发`finish`事件                              |
