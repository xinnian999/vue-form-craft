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

当字段需要更复杂的校验，如邮箱、URL、手机号时，使用 `rules`。

```ts
type TriggerType = 'blur' | 'change'

type FormRule = {
  // 校验表达式，可设置为字符串格式的【正则表达式】或【JS表达式】。
  // 【正则表达式】应该将\转义，【JS表达式】应该返回一个布尔值。
  expr: string
  // 校验失败提示
  message?: string
  // 校验触发时机
  trigger?: TriggerType | TriggerType[]
}

type FormRules = FormRule[]
```


示例：下面是一个注册表单，每一项都使用了`rules`校验。

::: demo expand

demo/RuleDemo.vue

:::