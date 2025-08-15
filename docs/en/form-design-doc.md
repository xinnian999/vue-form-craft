# Form Design

## Introduction

FormDesign is a visual form designer component for form-magic.

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

| Name          | Type           | Default | Description                                 |
| ------------- | -------------- | ------ | ------------------------------------------- |
| v-model       | `FormSchema`   | -      | The schema of the designer.                  |
| schemaContext | `object`       | -      | Custom [linkage variables](/en/linkage) for the schema. |
| omitMenus     | `string[]`     | []     | An array of component keys to hide in the left menu. |
| templates     | `TemplateData` | -      | Custom templates available in the left menu.  |

## Events

| Name   | Type       | Description       |
| ------ | ---------- | ------------------ |
| onSave | `()=>void` | Triggered when the save button is clicked. |

