# Form Render

## Introduction

FormRender is the rendering component of vue-form-craft.

::: demo expand

demo/FormRender.vue

:::

## Props

| Name          | Type     | Default | Description                                 |
| ------------- | -------- | ------ | ---------------------------------------- |
| v-model       | `object` | {}     | Form value                                   |
| schema        | `object` | ——     | Form Schema configuration, pure JSON, used to describe the form structure |
| schemaContext | `object` | {}     | Schema custom [linkage variables](/en/linkage)  |

## Exposes

> Methods exposed by the component, called through ref

| Name        | Type             | Description                                                                              |
| ----------- | ---------------- | --------------------------------------------------------------------------------- |
| validate    | `() => Promise`  | Validate the form                                                                          |
| resetFields | `name[] => void` | Accepts an array of names, such as `['name','age']`, to reset a group of fields to their initial values. If not passed, all fields will be reset |
| context     | `object`         | [Linkage variables](/en/linkage) of the form                                                    |

