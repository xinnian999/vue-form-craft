<script setup>
import FormRender from '../demo/FormRender.vue'

</script>

# FormRender 表单渲染器

## 简介

FormRender 是 vue-form-craft 的渲染组件。

::: demo expand

demo/FormRender.vue

:::

## Props

| 参数名        | 类型     | 默认值 | 描述                                     |
| ------------- | -------- | ------ | ---------------------------------------- |
| v-model       | `object` | {}     | 表单值                                   |
| schema        | `object` | ——     | 表单Schema配置，纯JSON，用于描述表单结构 |
| schemaContext | `object` | {}     | Schema自定义的 [联动变量](/zh/linkage)  |

## Exposes

> 组件暴露出的方法，通过ref调用

| 名称        | 类型             | 描述                                                                              |
| ----------- | ---------------- | --------------------------------------------------------------------------------- |
| validate    | `() => Promise`  | 校验表单                                                                          |
| resetFields | `name[] => void` | 接收一个name数组，例如`['name','age']` 来重置一组字段为初始值，不传会重置所有字段 |
| context     | `object`         | 表单的[联动变量](/zh/linkage)                                                    |
