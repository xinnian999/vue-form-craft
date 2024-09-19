# JsonSchema in Detail
Low-code form development is all about JSON Schema. Understanding this protocol allows us to develop forms more efficiently and quickly.

## Structure

First, we need to understand that JSON Schema is an abstraction of a form.

The outermost layer of JSON represents the overall configuration of the form, and the `items` field contains the configuration of each form item.

Within `items`, each form item is represented by its own set of properties, such as `label`, `name`, and `component`.

The `component` property indicates which component should be used for the form item, and `props` contains the props passed to that component. Most components are based on the **element-plus** library, so they support all the props documented in the `el` documentation.

```json
{
  "labelWidth": 150, // Width of the form label
  "labelAlign": "right", // Alignment of the form label
  "size": "default", // Size of the form items
  "items": [
    // Configuration of all form items
    {
      "label": "Username", // Label of the form item
      "component": "input", // Component used for the form item
      "props": {
        // Props passed to the component, supporting all the props of the element-plus component
        "placeholder": "Please enter your username"
      },
      "name": "username" // Unique identifier, i.e., the value key
    },
    {
      "label": "Password",
      "component": "password",
      "props": {
        "placeholder": "Please enter your password"
      },
      "name": "password"
    }
  ]
}
```

## Configuration

After understanding the simple example above, here are all the optional configurations:

### Overall Form Configuration

| Parameter             | Type                                | Default     | Description           |
| --------------------- | ----------------------------------- | ----------- | --------------------- |
| labelWidth             | `number`                            | `150`       | Width of the form label |
| labelAlign             | `'left' \| 'top' \| 'right' `       | `'right'`   | Alignment of the form label |
| size                   | `'small' \| 'default' \| 'large'`   | `'default'` | Size of the form items |
| hideRequiredAsterisk   | `boolean`                           | `false`     | Hide the required asterisk in the form |
| labelBold              | `boolean`                           | `false`     | Make the form label bold |
| disabled               | `boolean`                           | `false`     | Disable all form items |

### Form Item Configuration

| Parameter       | Type               | Default | Description                                      |
| --------------- | ------------------ | ------- | ------------------------------------------------ |
| label           | `string`           | -       | Label                                            |
| name            | `string`           | -       | Unique identifier, i.e., the value key            |
| component       | `string`           | -       | Component to be used                             |
| props           | object             | {}      | Props passed to the component, refer to the element-plus documentation for details |
| required        | `boolean`          | false   | Whether the form item is required                 |
| initialValue   | any                | -       | Initial value of the form item                    |
| help            | `string`           | -       | Help information for the form item                |
| hidden          | `boolean`          | false   | Whether to hide the form item                     |
| hideLabel       | `boolean`          | false   | Whether to hide the label of the form item        |
| rules           | `FormRule[]`       | -       | Validation rules for the form item, specific to the Input component |
| children        | `FormItemType[]`   | -       | Data for nested form items, used for containers, cards, grids, etc. |
| change          | `FormChange[]`     | -       | Configuration for triggering actions when the value of the form item changes |
| designKey       | `string`           | -       | Key used by the form designer, automatically generated |

