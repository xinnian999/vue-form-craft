# Form Linkage

To evaluate the strength of a form tool, form linkage capability is crucial.

`vue-form-craft` provides a set of **extremely simple and flexible** form linkage implementation methods!

It is divided into two types of implementations: **configuration linkage** and **value linkage**.

## Template Expression (Configuration Linkage)

::: v-pre
The template expression is in string format and is characterized by double curly braces {{ ... }}. It provides a concise configuration method for field linkage.

In JsonSchema, strings wrapped in double curly braces will be parsed as **JavaScript expressions and return results**, and can use some linkage variables.

> Linkage variables that can be used in schema interpolation expressions:

| Variable Name | Type   | Description                      |
| ------------- | ------ | -------------------------------- |
| $values       | Object | Values of the entire form        |
| $selectData   | Object | Collection of selected item data for **select-type fields** |
| $item         | Object | **Special for increment components**, the value of a single row |
| $index        | Object | **Special for increment components**, the index of a single row |
| ...           | any    | Custom variables passed in by schemaContext |

This type of linkage can handle most linkage scenarios, such as controlling field disablement, hiding, and text prompts.
:::

**Template expressions are supported for all protocol fields in JsonSchema.** This means that you can dynamically control any fine-grained configuration of the form and achieve various complex linkage effects!

::: demo expand

demo/linkageDemo/linkage.vue

:::

## Change Configuration (Value Linkage)

The template expressions mentioned above can only achieve linkage between configurations and cannot achieve linkage of **modifying form values**. Therefore, a change configuration is provided for each field.

When change is configured, the change linkage will only be triggered when the value of this field changes.

Change is an array that can link multiple fields simultaneously. The target is the target field, and the value is the modified value, which also supports template expressions.

::: demo expand

demo/linkageDemo/linkage3.vue

:::

## More Examples

1. Input negative feedback reasons when the rating is below 3 stars.

::: demo 

demo/linkageDemo/linkage1.vue

:::

<br/>

2. Display the price after selecting a product.

::: demo 

demo/linkageDemo/linkage4.vue

:::
