# 数据校验

### 必填校验

如果字段只需要判断是否填写，直接设置`required: true`。
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

当字段需要更复杂的校验时，使用 `rules`。

> `FormRules` 类型定义

```ts
type RuleType =
  | 'required'
  | 'min'
  | 'max'
  | 'pattern'
  | 'builtin'
  | 'enum'
  | 'custom'
  | 'jsExpr'

type RuleItem = {
  type?: RuleType
  value?: any
  message?: string
  trigger?: 'blur' | 'change'
}

type FormRules = RuleItem[]
```

常见规则写法：

```json
[
  { "type": "min", "value": 6, "message": "长度不能小于6位", "trigger": "blur" },
  { "type": "pattern", "value": "^[a-zA-Z0-9_]+$", "message": "只能输入字母数字下划线" }
]
```

示例：下面是一个注册表单，每一项都使用了`rules`校验。

::: demo expand

demo/RuleDemo.vue

:::
