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

| 参数名               | 类型           | 默认值 | 是否必传 | 描述                          |
| -------------------- | -------------- | ------ | -------- | ----------------------------- |
| schema               | object         | {}     | No       | 设计器的初始Schema            |
| omitMenus            | string[]       | {}     | No       | 隐藏左侧组件key数组           |
| templates            | templateType[] | {}     | No       | 定制左侧可用模板              |
| previewSchemaContext | object         | {}     | No       | **表单预览** 的自定义联动变量 |
| style                | any            | ———    | No       | 设计器的style                 |
| class                | any            | ———    | No       | 设计器的class                 |

**templateType**

| 参数名 | 类型   | 描述         |
| ------ | ------ | ------------ |
| name   | string | 模板名称     |
| schema | object | 模板的Schema |

## Events

| 事件名 | 类型         | 描述               |
| ------ | ------------ | ------------------ |
| onSave | schema=>void | 点击保存按钮时触发 |
