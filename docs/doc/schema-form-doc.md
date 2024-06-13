## 简介

SchemaForm 是 vue-form-craft 的渲染组件。

<div class='login'></div>

## Props

| 参数名        | 类型    | 默认值  | 是否必传 | 描述                                               |
| ------------- | ------- | ------- | -------- | -------------------------------------------------- |
| v-model       | object  | ref({}) | No       | 表单数据对象，可用于设置表单值初始值等操作，可不传 |
| schema        | object  | ——      | No       | 表单Schema配置，纯JSON，用于描述表单结构           |
| schemaContext | object  | {}      | No       | 表单Schema，自定义的 [联动变量](/document/linkage) |
| footer        | Boolean | false   | No       | 显示表单底部提交按钮                               |
| style         | any     | ——      | No       | 表单的style                                        |
| class         | any     | ——      | No       | 表单的class                                        |


## Events

| 事件名         | 类型              | 描述                         |
| -------------- | ----------------- | ---------------------------- |
| onFinish       | values=>void      | 提交表单且表单校验成功后触发 |
| onFinishFailed | errorFields=>void | 提交表单且表单校验失败后触发 |
| onChange       | values=>void      | 表单值改变时触发             |

## Exposes

>组件暴露出的方法，通过ref调用

| 名称          | 类型                    | 描述                                                                              |
| ------------- | ----------------------- | --------------------------------------------------------------------------------- |
| submit        | () => Promise\<values\> | 提交并校验表单，与submit按钮效果相同                                              |
| validate      | () => Promise           | 校验表单                                                                          |
| resetFields   | name[] => void          | 接收一个name数组，例如`['name','age']` 来重置一组字段为初始值，不传会重置所有字段 |
| getFormValues | () => void              | 获取表单值                                                                        |
| setFormValues | values => void          | 修改表单值，可用于表单回显                                                        |
| context       | {}                      | 表单的[联动变量](/document/linkage)                                               |




