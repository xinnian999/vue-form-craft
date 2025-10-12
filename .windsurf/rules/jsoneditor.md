---
trigger: always_on
---

# API Reference

## JSONEditor

### Constructor

#### `JSONEditor(container [, options [, json]])`

Constructs a new JSONEditor.

_Parameters:_

- `{Element} container`

  An HTML DIV element. The JSONEditor will be created inside this container element.

- `{Object} options`

  Optional object with options. The available options are described under
  [Configuration options](#configuration-options).

- `{JSON} json`

  Initial JSON data to be loaded into the JSONEditor. Alternatively, the method `JSONEditor.set(json)` can be used to load JSON data into the editor.

_Returns:_

- `{JSONEditor} editor`

  New instance of a JSONEditor.

### Configuration options

- `{Object} ace`

  Provide a custom version of the [Ace editor](http://ace.c9.io/) and use this instead of the version that comes embedded with JSONEditor. Only applicable when `mode` is `code`.

  When providing your own instance of Ace editor, be aware that JSONEditor assumes the following Ace plugins to be loaded: `mode-json`, `worker-json`, `ext-searchbox`, `ext-language_tools`.

  Note that when using the minimalist version of JSONEditor (which has Ace excluded), JSONEditor will try to load the Ace plugins `ace/mode/json` and `ace/ext/searchbox`. These plugins must be loaded beforehand or be available in the folder of the Ace editor.

- `{Object} ajv`

  Provide a custom instance of [ajv](https://github.com/epoberezkin/ajv), the
  library used for JSON schema validation. Example:

  ```js
  var options = {
    ajv: Ajv({
      allErrors: true,
      verbose: true,
      jsonPointers: false,
      $data: true
    })
  }
  ```

  > IMPORTANT: JSONEditor relies on some specific configuration of Ajv.
  > Providing different configuration (like `jsonPointers: true` instead of `false`)
  > results in JSONEditor breaking because the format of the Ajv errors differs
  > from what is expected.

- `{function} onChange()`

  Set a callback function triggered when the contents of the JSONEditor change.
  This callback does not pass the changed contents, use `get()` or `getText()` for that.
  Note that `get()` can throw an exception in mode `text`, `code`, or `preview`, when the editor contains invalid JSON.
  Will only be triggered on changes made by the user, not in case of programmatic changes via the functions `set`, `setText`, `update`, or `updateText`.
  See also callback functions `onChangeJSON(json)` and `onChangeText(jsonString)`.

- `{function} onChangeJSON(json)`

  Set a callback function triggered when the contents of the JSONEditor change.
  Passes the changed JSON document.
  Only applicable when option `mode` is `tree`, `form`, or `view`.
  The callback will only be triggered on changes made by the user, not in case of programmatic changes via the functions `set`, `setText`, `update`, or `updateText`.
  Also see the callback function `onChangeText(jsonString)`.

- `{function} onChangeText(jsonString)`

  Set a callback function triggered when the contents of the JSONEditor change.
  Passes the changed JSON document inside a string (stringified).
  The callback will only be triggered on changes made by the user, not in case of programmatic changes via the functions `set`, `setText`, `update`, or `updateText`.
  Also see the callback function `onChangeJSON(json)`.

- `{function} onClassName({ path, field, value })`

  Set a callback function to add custom CSS classes to the rendered nodes. Only applicable when option `mode` is `tree`, `form`, or `view`.

  The callback is invoked with an object containing `path`, `field` and `value`:

  ```
  {
    path: string[],
    field: string,
    value: string
  }
  ```

  The function must either return a string containing CSS class names, or return `undefined` in order to do nothing for a specific node.

  In order to update css classes when they depend on external state, you can call `editor.refresh()`.

- `{function} onExpand({ path, isExpand, recursive })`

  Set a callback function to be invoked when a node is expanded/collapsed (not programtically via APIs). Only applicable when option `mode` is `tree`, `form`, or `view`.

  The callback is invoked with an object containing `path`, `isExpand` and `recursive`:

  ```
  {
    path: string[],
    isExpand: boolean,
    recursive: boolean
  }
  ```

- `{function} onEditable({ path, field, value })`

  Set a callback function to determine whether individual nodes are editable or read-only. Only applicable when option `mode` is `tree`, `text`, or `code`.

  In case of mode `tree`, the callback is invoked as `editable(node)`, where the first parameter is an object:

  ```
  {
    field: string,
    value: string,
    path: string[]
  }
  ```

  The function must either return a boolean value to set both the nodes field and value editable or read-only, or return an object `{field: boolean, value: boolean}` to set set the read-only attribute for field and value individually.

  In modes `text` and `code`, the callback is invoked as `editable(node)` where `node` is an empty object (no field, value, or path). In that case the function can return false to make the text or code editor completely read-only.

- `{function} onError(error)`

  Set a callback function triggered when an error occurs. Invoked with the error as first argument. The callback is only invoked
  for errors triggered by a users action, like switching from code mode to tree mode or clicking the Format button whilst the editor doesn't contain valid JSON. When not defined, a basic alert with the error message will be opened.

- `{function} onModeChange(newMode, oldMode)`

  Set a callback function triggered right after the mode is changed by the user. Only applicable when
  the mode can be changed by the user (i.e. when option `modes` is set).

- `{function} onNodeName({ path, type, size, value })`

  Customize the name of object and array nodes. By default the names are brackets with the number of childs inside,
  like `{5}` and `[32]`. The number inside can be customized. using `onNodeName`.

  The first parameter is an object containing the following properties:

  ```
  {
    path: string[],
    type: 'object' | 'array',
    size: number,
    value: object
  }
  ```

  The `onNodeName` function should return a string containing the name for the node. If nothing is returned,
  the size (number of childs) will be displayed.

- `{function} onValidate(json)`

  Set a callback function for custom validation. Available in all modes.

  On a change of the JSON, the callback function is invoked with the changed data. The function should return
  an array with errors or null if there are no errors. The function can also return a `Promise` resolving with
  the errors retrieved via an asynchronous validation (like sending a request to a server for validation).
  The returned errors must have the following structure: `{path: Array.<string | number>, message: string}`.
  Example:

  ```js
  var options = {
    onValidate: function (json) {
      var errors = []

      if (json && json.customer && !json.customer.address) {
        errors.push({
          path: ['customer'],
          message: 'Required property "address" missing.'
        })
      }

      return errors
    }
  }
  ```

  Also see the option `schema` for JSON schema validation.

- `{function} onValidationError(errors: ValidationError[])`

  Set a callback function for validation and parse errors. Available in all modes.
  The `ValidationError` contains a `type`, and an `error` object.

  On validation of the json, if errors of any kind were found this callback is invoked with the errors data.

  On change, the callback will be invoked only if errors were changed.

  See also method `JSONEditor.validate()`.

  Example:

  ```js
  var options = {
    /**
    * @param {Array} errors validation errors
    */
    onValidationError: function (errors) {
      errors.forEach((error) => {
        switch (error.type) {
          case 'validation': // schema validation error
            ...
            break;
          case 'customValidation': // custom validation error
            ...
            break;
          case 'error':  // json parse error
            ...
            break;
          ...
        }
      });
      ...
    }
  }
  ```

- `{function} onCreateMenu(items, node)`

  Customize context menus in tree mode.

  Sets a callback function to customize the context menu in tree mode. Each time the user clicks on the context menu button, an array of menu items is created. If this callback is configured, the array with menu items is passed to this function. The menu items can be customized in this function in any aspect of these menu items, including deleting them and/or adding new items. The function should return the final array of menu items to be displayed to the user.

  Each menu item is represented by an object, which may also contain a submenu array of items. See the source code of example 21 in the examples folder for more info on the format of the items and submenu objects.

  The second argument `node` is an object containing the following properties:

  ```
  {
    type: 'single' | 'multiple' | 'append'
    path: Array,
    paths: Array with paths
  }
  ```

  The property `path` containing the path of the node, and `paths` contains the same path or in case there are multiple selected nodes it contains the paths of all selected nodes.
  When the user opens the context menu of an append node (in an empty object or array), the `type` will be `'append'` and the `path` will contain the path of the parent node.

- `{boolean} escapeUnicode`

  If `true`, unicode characters are escaped and displayed as their hexadecimal code (like `\u260E`) instead of the character itself (like `☎`). `false` by default.

- `{boolean} sortObjectKeys`

  If `true`, object keys in 'tree', 'view' or 'form' mode list be listed alphabetically instead by their insertion order. Sorting is performed using a natural sort algorithm, which makes it easier to see objects that have string numbers as keys. `false` by default.

- `{boolean} limitDragging`

  If `false`, nodes can be dragged from any parent node to any other parent node. If `true`, nodes can only be dragged inside the same parent node, which effectively only allows reordering of nodes. By default, `limitDragging` is `true` when no JSON `schema` is defined, and `false` otherwise.

- `{boolean} history`

  Enables history, adds a button Undo and Redo to the menu of the JSONEditor. `true` by default. Only applicable when `mode` is `'tree'`, `'form'`, or `'preview'`.

- `{String} mode`

  Set the editor mode. Available values: 'tree' (default), 'view', 'form', 'code', 'text', 'preview'. In 'view' mode, the data and datastructure is read-only. In 'form' mode, only the value can be changed, the data structure is read-only. Mode 'code' requires the Ace editor to be loaded on the page. Mode 'text' shows the data as plain text.
  The 'preview' mode can handle large JSON documents up to 500 MiB. It shows a preview of the data, and allows to
  transform, sort, filter, format, or compact the data.

- `{String[]} modes`

  Create a box in the editor menu where the user can switch between the specified modes. Available values: see option `mode`.

- `{String} name`

  Initial field name for the root node, is `undefined` by default. Can also be set using `JSONEditor.setName(name)`. Only applicable when `mode` is 'tree', 'view', or 'form'.

- `{Object} schema`

  Validate the JSON object against a JSON schema. A JSON schema describes the
  structure that a JSON object must have, like required properties or the type
  that a value must have.

  See [http://json-schema.org/](http://json-schema.org/) for more information.

  Also see the option `onValidate` for custom validation.

- `{Object} schemaRefs`

  Schemas that are referenced using the `$ref` property from the JSON schema that are set in the `schema` option,
  the object structure in the form of `{referen
