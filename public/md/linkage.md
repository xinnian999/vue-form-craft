## 表单联动

要评价一个表单工具能力强不强，表单联动能力至关重要。 **vue-form-craft** 通过`动态计算schema` 、`watch 监听` 等方式尽可能的让表单联动变简单。

### 插值表达式

Schema 所有协议字段都支持插值表达式。插值表达式为字符串格式，以双花括号 {{ ... }}为语法特征，对于简单的联动提供一种简洁的配置方式。

例如：控制表单项禁用、隐藏、文案提示等交互。

---

下面是一个简单案例：

类型字段默认是隐藏的，数量字段默认是禁用的。

必须标题输入了值，类型才会出现。

类型如果选了【发布多条】，数量会解除禁用

<div class="test"></div>


```json
{
  "labelWidth": 150,
  "labelAlign": "right",
  "size": "default",
  "items": [
    {
      "label": "标题",
      "component": "input",
      "props": {
        "placeholder": "请输入..."
      },
      "onlyId": "form-JPzT",
      "name": "title"
    },
    {
      "label": "类型",
      "component": "select",
      "props": {
        "mode": "static",
        "options": [
          {
            "label": "存草稿",
            "value": "1"
          },
          {
            "label": "发布一条",
            "value": "2"
          },
          {
            "label": "发布多条",
            "value": "3"
          }
        ],
        "placeholder": "请选择...",
        "labelKey": "label",
        "valueKey": "value"
      },
      "onlyId": "form-2ZCi",
      "name": "type",
      "hidden": "{{!$form.title}}"
    },
    {
      "label": "数量",
      "component": "inputNumber",
      "onlyId": "form-9R9B",
      "name": "count",
      "props": {
        "min": 1,
        "max": 9999,
        "step": 1,
        "disabled": "{{$form.type!=='3'}}"
      },
      "initialValue": 1
    }
  ]
}

```

