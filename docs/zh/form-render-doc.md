# FormRender 表单渲染器

## 简介

FormRender 是 vue-form-craft 的渲染组件。

::: demo expand

demo/FormRender.vue

:::

## Props

| 参数名        | 类型         | 默认值 | 描述                                     |
| ------------- | ------------ | ------ | ---------------------------------------- |
| v-model       | `object`     | {}     | 表单值                                   |
| schema        | `FormSchema` | —      | 表单Schema配置，纯JSON，用于描述表单结构 |
| schemaContext | `object`     | {}     | Schema自定义的 [联动变量](/zh/linkage)   |
| footer        | `boolean`    | false  | 启用表单内置的提交和重置按钮             |
| read          | `boolean`    | false  | 阅读模式                                 |

## Event

| 参数名   | 类型               | 描述                         |
| -------- | ------------------ | ---------------------------- |
| onFinish | `(values) => void` | 点击表单内置的提交按钮时触发 |

## Exposes

| 名称        | 类型             | 描述                                                                              |
| ----------- | ---------------- | --------------------------------------------------------------------------------- |
| schema              | `FormSchema`                                        | 表单Schema配置，纯JSON，用于描述表单结构                                          |
| schemaContext       | `object`                                            | Schema自定义的 [联动变量](/zh/linkage)                                            |
| footer              | `boolean`                                           | 启用表单内置的提交和重置按钮                                                      |
| read                | `boolean`                                           | 是否处于阅读模式                                                                  |
| formValues          | `object`                                            | 表单值                                                                            |
| selectData          | `object`                                            | 选择类组件的数据源                                                                |
| initialValues       | `object`                                            | 表单初始值                                                                        |
| context             | `object`                                            | 表单联动变量                                                                      |
| updateFormValues    | `(values: Record<string, any>) => void`             | 更新**表单值**的方法                                                              |
| updateSelectData    | `(key: string, value: Record<string, any>) => void` | 更新**选择类组件的数据源**的方法                                                  |
| updateInitialValues | ` (values: Record<string, any>) => void`            | 更新**表单初始值**的方法                                                          |
| validate            | ` () => Promise<boolean>`                           | 校验表单                                                                          |
| resetFields         | `name[] => void`                                    | 接收一个name数组，例如`['name','age']` 来重置一组字段为初始值，不传会重置所有字段 |
| submit              | `() => void`                                        | 校验表单，校验通过后会触发`onFinish`事件                                          |


