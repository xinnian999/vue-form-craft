import type { FormSchema } from "form-craft";

export default {
  "labelWidth": 150,
  "labelAlign": "left",
  "scrollToError": true,
  "size": "default",
  "submitBtn": true,
  "items": [
    {
      "name": "form-2DaW",
      "component": "Tabs",
      "props": {
        "defaultKey": "attrs",
        "tabPosition": "top",
        "type": "card"
      },
      "designKey": "design-wUHG",
      "children": [
        {
          "label": "属性",
          "name": "attrs",
          "component": "TabPane",
          "designKey": "tab-1",
          "children": [
            {
              "name": "form-IH6q",
              "component": "Divider",
              "props": {
                "title": "字段配置",
                "contentPosition": "center"
              },
              "designKey": "design-R9lS"
            },
            {
              "label": "标签",
              "name": "label",
              "component": "Input",
              "props": {
                "placeholder": "",
                "autocomplete": "new-password",
                "clearable": true
              },
              "designKey": "design-gfim"
            },
            {
              "label": "字段标识",
              "name": "name",
              "component": "Input",
              "props": {
                "placeholder": "",
                "autocomplete": "new-password",
                "clearable": true
              },
              "designKey": "design-njXF"
            },
            {
              "label": "气泡提示",
              "name": "help",
              "component": "TextArea",
              "props": {
                "placeholder": "",
                "autosize": {
                  "minRows": 2,
                  "maxRows": 999
                },
                "clearable": true
              },
              "designKey": "design-Qh45"
            }
          ]
        },
        {
          "label": "校验",
          "name": "name2",
          "component": "TabPane",
          "designKey": "tab-2",
          "children": []
        }
      ]
    }
  ]
} satisfies FormSchema