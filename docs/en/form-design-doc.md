# FormDesign 表单设计器

## 简介

FormDesign 是 vue-form-craft 的可视化表单设计器组件。

```vue
<template>
  <form-design @onSave="onSave" />
</template>

<script setup>
const onSave = (newSchema) => {
  console.log(newSchema)
}
</script>
```

## Props

| 参数名        | 类型           | 默认值 | 描述                                          |
| ------------- | -------------- | ------ | --------------------------------------------- |
| v-model       | `FormSchema`   | -      | 设计器的Schema                            |
| schemaContext | `object`       | -      | Schema自定义的 [联动变量](/doc/linkage) |
| omitMenus     | `string[]`     | []     | 隐藏左侧组件key数组                           |
| templates     | `TemplateData` | -      | 定制左侧可用模板                              |

## Events

| 事件名 | 类型       | 描述               |
| ------ | ---------- | ------------------ |
| onSave | `()=>void` | 点击保存按钮时触发 |
