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
当字段需要更复杂的校验，如邮箱、URL 或自定义正则时，使用 rules。

> rules是一个数组，可以配置多个校验规则。

- pass: 校验通过条件，字符串格式，可设置为【正则表达式】或【JS表达式】
- message: 校验失败提示
- trigger: 校验触发时机


示例：
```json
{
  "label": "邮箱",
  "name": "email",
  "component": "Input",
  "rules": [
    {
      "pass": "email",
      "message": "请输入有效的邮箱地址",
      "trigger": "blur"
    }
  ]
},
{
  "label": "手机号",
  "name": "phone",
  "component": "Input",
  "rules": [
    {
      "pass": "^1[3-9]\\d{9}$",
      "message": "请输入有效的手机号",
      "trigger": "blur"
    }
  ]
}
```