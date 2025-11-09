## JsonSchema数据协议

《JsonSchema》必须遵守以下规范：

- 《JsonSchema》的第一层是表单整体的全局配置，如标签样式，整体禁用等。 除此之外就是`items`了。
- items是表单项的合集。每个表单项可配置 label、name、component、props、designKey 等。
- component 字段实际上是 element-plus 的组件映射（Input → ElInput，Select → ElSelect …）。每个表单项的 props 可以传入 对应 element-plus 组件支持的所有 props。但Radio/Checkbox比较特殊，是基于el的二次封装组件，可以直接传入options。
- 每个表单项必须增添唯一的designKey，格式: design-xxxx。
- 示例：

```json
{
  "labelWidth": 150,
  "labelAlign": "right",
  "size": "default",
  "items": [
    {
      "label": "用户名",
      "component": "Input",
      "props": {
        "placeholder": "请输入用户名"
      },
      "name": "username"，
      "designKey": "design-a29l"
    },
    {
      "label": "密码",
      "component": "Password",
      "props": {
        "placeholder": "请输入密码"
      },
      "name": "password",
      "designKey": "design-t10l"
    }
  ]
}
```

> 了解了上面的简单用例后，下面是JsonSchema所有可选配置

### 表单全局配置

- **labelWidth**: `number`，默认 `150`，表单 label 宽度
- **labelAlign**: `'left' | 'top' | 'right'`，默认 `'right'`，表单 label 对齐方式
- **labelSuffix**: `string`，默认 `-`，表单 label 后缀
- **labelBold**: `boolean`，默认 `false`，是否加粗 label
- **size**: `'small' | 'default' | 'large'`，默认 `'default'`，表单项大小
- **hideRequiredAsterisk**: `boolean`，默认 `false`，是否隐藏必填星号
- **disabled**: `boolean`，默认 `false`，是否禁用整个表单
- **items**: `FormItemType[]`，默认 `[]`，表单所有表单项配置

### 表单项配置

- **label**: `string`，表单项标签
- **name**: `string`，唯一标识（数据 key）
- **component**: `string`，组件标识（如 Input、Select）
- **props**: `object`，透传给组件的属性（参考 element-plus 文档）
- **required**: `boolean`，默认 `false`，是否必填
- **initialValue**: `any`，初始值
- **help**: `string`，提示信息
- **hidden**: `boolean`，默认 `false`，是否隐藏
- **hideLabel**: `boolean`，默认 `false`，是否隐藏标签
- **rules**: `FormRule[]`，自定义校验规则
- **children**: `FormItemType[]`，子表单项，用于嵌套组件（如卡片、栅格、自增容器）
- **linkages**: `FormLinkage[]`，联动配置
- **designKey**: `string`，表单设计器的标识 key，自动生成

## 联动规范

联动分为两种方式，根据使用场景选择：

### 方式一：JS 表达式（简单联动）

- 使用 `{{ }}` 包裹 JS 表达式
- 适用于**简单的配置属性动态计算**，例如：hidden、disabled、placeholder、help 等
- 表达式内可以访问 `$values`（表单数据对象）

示例：

```json
{
  "label": "简介",
  "component": "TextArea",
  "name": "desc",
  "props": {
    "placeholder": "{{ $values.name ? $values.name + '的简介' : '请输入简介' }}",
    "disabled": "{{ !$values.name }}"
  },
  "hidden": "{{ !$values.showDesc }}",
  "designKey": "design-1001"
}
```

### 方式二：linkages 配置（复杂联动）

- 适用于**复杂的、多目标的联动逻辑**
- 可以同时修改配置和数据
- 支持条件触发
- 规则字段：
  - **target**: 目标字段的 name（必填）
  - **type**: `'config' | 'data'`，联动类型（必填）
    - `'config'`：修改目标字段的配置（如 hidden、disabled、label 等）
    - `'data'`：修改目标字段的数据值
  - **path**: 配置路径（type 为 'config' 时必填），如 `'hidden'`、`'props.disabled'`
  - **value**: 要设置的值，支持 JS 表达式
  - **condition**: 触发条件（可选），支持 JS 表达式

示例 1（修改配置）：

```json
{
  "label": "商品类型",
  "name": "productType",
  "component": "Select",
  "designKey": "design-type",
  "linkages": [
    {
      "target": "productName",
      "type": "config",
      "path": "label",
      "value": "{{ $values.productType === 'electronics' ? '电子产品名称' : '服装名称' }}"
    },
    {
      "target": "warranty",
      "type": "config",
      "path": "hidden",
      "value": "{{ $values.productType !== 'electronics' }}"
    }
  ]
}
```

示例 2（修改数据）：

```json
{
  "label": "字段1",
  "component": "Input",
  "name": "item1",
  "designKey": "design-item1",
  "linkages": [
    {
      "target": "item2",
      "type": "data",
      "value": "{{ $values.item1 * 2 + '' }}"
    },
    {
      "target": "item3",
      "type": "data",
      "value": "{{ $values.item1 + '元' }}"
    }
  ]
}
```

### ⚠️ 重要提示

**不要在同一个属性上同时使用 JS 表达式和 linkages**，否则会导致逻辑混乱。请选择其中一种方式：
- 简单联动：直接在属性上使用 JS 表达式
- 复杂联动：使用 linkages 配置

## 校验规范

### 必填校验

如果字段只需要判断是否填写，直接设置required: true。
示例：

```json
{
  "label": "姓名",
  "name": "name",
  "component": "Input",
  "required": true
}
```

### 复杂校验

当字段需要更复杂的校验，如邮箱、URL、手机号时，使用 `rules`。

> FormRules 类型定义

```ts
type TriggerType = 'blur' | 'change'

type FormRule = {
  // 校验表达式，可设置为字符串格式的【正则表达式】或【】。
  // 【正则表达式】应该将\转义，【】应该返回一个布尔值。
  expr: string
  // 校验失败提示
  message?: string
  // 校验触发时机
  trigger?: TriggerType | TriggerType[]
}

type FormRules = FormRule[]
```

示例：下面是一个注册表单，每一项都使用了`rules`校验。

```json
{
  "labelWidth": 150,
  "labelAlign": "right",
  "size": "default",
  "scrollToError": true,
  "items": [
    {
      "label": "用户名",
      "name": "username",
      "component": "Input",
      "props": {
        "placeholder": "请输入用户名"
      },
      "required": true,
      "designKey": "design-usrn"
    },
    {
      "label": "密码",
      "name": "password",
      "component": "Password",
      "required": true,
      "props": {
        "placeholder": "请输入密码"
      },
      "rules": [
        {
          "expr": "/^(?=(?:.*[a-z]){0,})(?=(?:.*[A-Z]){0,})(?=(?:.*\\d){0,})(?=(?:.*[^a-zA-Z\\d]){0,})(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\\d])|(?=.*[a-z])(?=.*\\d)(?=.*[^a-zA-Z\\d])|(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]))/",
          "message": "密码至少包含大小写字母、数字、特殊符号中的三种",
          "trigger": "blur"
        },
        {
          "expr": "/^.{8,20}$/",
          "message": "密码长度必须为8-20位",
          "trigger": "blur"
        }
      ],
      "designKey": "design-pssw"
    },
    {
      "label": "确认密码",
      "props": {
        "placeholder": "请再次输入密码"
      },
      "name": "confirmPassword",
      "component": "Password",
      "required": true,
      "rules": [
        {
          "expr": "{{ $values.password === $values.confirmPassword }}",
          "message": "两次输入的密码不一致",
          "trigger": "blur"
        }
      ],
      "designKey": "design-cnfp"
    },
    {
      "label": "手机号",
      "name": "phone",
      "component": "Input",
      "props": {
        "placeholder": "请输入手机号",
        "maxlength": 11
      },
      "rules": [
        {
          "expr": "/^1[3-9]\\d{9}$/",
          "message": "请输入有效的手机号",
          "trigger": "blur"
        }
      ],
      "designKey": "design-phne",
      "required": true
    },
    {
      "label": "邮箱",
      "name": "email",
      "component": "Input",
      "props": {
        "placeholder": "请输入邮箱"
      },
      "rules": [
        {
          "expr": "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/",
          "message": "请输入有效的邮箱",
          "trigger": "blur"
        }
      ],
      "designKey": "design-emal"
    }
  ]
}
```
