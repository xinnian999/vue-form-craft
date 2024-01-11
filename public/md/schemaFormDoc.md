## 简介

SchemaForm是vue-form-craft的表单JSON渲染组件。

## Props

| 参数名        | 类型       | 默认值  | 是否必传 | 描述                                         |
| ------------- | ---------- | ------- | -------- | -------------------------------------------- |
| schema        | object     | --      | Yes      | 表单JSON配置，用于描述表单结构               |
| v-model       | object ref | ref({}) | No       | 表单数据对象，会与组件内部的数据对象双向绑定 |
| schemaContext | object     | {}      | No       | 自定义的上下文对象，用于表单联动             |

## Events

| 事件名   | 类型         | 描述           |
| -------- | ------------ | -------------- |
| onSubmit | values=>void | 表单提交时触发 |

## Exposes

| 名称          | 类型                  | 描述                                   |
| ------------- | --------------------- | -------------------------------------- |
| submit        | ()=>Promise\<values\> | 提交表单，会先触发校验                 |
| validate      | ()=>Promise           | 校验表单                               |
| reset         | ()=>void              | 重置表单                               |
| getFormValues | ()=>void              | 读取表单当前值                         |
| setFormValues | (values)=>void        | 修改表单值，常用于表单回显             |
| selectData    | Array                 | 选择类型的组件，已选项对应的数据源集合 |
| context       | {}                    | 表单上下文集合                         |