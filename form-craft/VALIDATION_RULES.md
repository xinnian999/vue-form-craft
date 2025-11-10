# 新版校验规则使用说明

## 概述

新版校验规则采用统一的 `RuleItem` 类型定义，支持多种校验类型，并提供了可视化配置界面。

## RuleItem 类型定义

```typescript
type RuleType = 'required' | 'min' | 'max' | 'pattern' | 'builtin' | 'enum' | 'custom' | 'jsExpr'

type RuleItem = {
  type?: RuleType
  value?: any
  message?: string
  trigger?: TriggerType | TriggerType[]
  // 兼容旧格式
  expr?: string
}
```

## 规则类型说明

### 1. required - 必填校验

```json
{
  "type": "required",
  "message": "该字段是必填字段"
}
```

### 2. min - 最小长度

```json
{
  "type": "min",
  "value": 6,
  "message": "至少输入6个字符"
}
```

### 3. max - 最大长度

```json
{
  "type": "max",
  "value": 20,
  "message": "最多输入20个字符"
}
```

### 4. pattern - 正则表达式

```json
{
  "type": "pattern",
  "value": "^1[3-9]\\d{9}$",
  "message": "请输入有效的手机号"
}
```

**注意**：`value` 是正则表达式字符串，不需要包含斜杠。

### 5. builtin - 内置类型

使用 async-validator 的内置类型校验：

```json
{
  "type": "builtin",
  "value": "email",
  "message": "请输入有效的邮箱地址"
}
```

支持的内置类型：
- `string` - 字符串
- `number` - 数字
- `boolean` - 布尔值
- `method` - 方法
- `regexp` - 正则
- `integer` - 整数
- `float` - 浮点数
- `array` - 数组
- `object` - 对象
- `enum` - 枚举
- `date` - 日期
- `url` - URL
- `hex` - 十六进制
- `email` - 邮箱
- `any` - 任意类型

### 6. enum - 枚举值

```json
{
  "type": "enum",
  "value": ["admin", "user", "guest"],
  "message": "只能选择 admin、user 或 guest"
}
```

在可视化配置中，可以使用多行文本输入，每行一个值：
```
admin
user
guest
```

### 7. custom - 自定义函数

```json
{
  "type": "custom",
  "value": "if (value.length < 6) { callback(new Error('长度不足')); } else { callback(); }",
  "message": "自定义校验失败"
}
```

函数参数：
- `rule` - 规则对象
- `value` - 当前值
- `callback` - 回调函数

### 8. jsExpr - JS表达式

用于动态校验，支持访问表单数据：

```json
{
  "type": "jsExpr",
  "value": "{{ $values.password === $values.confirmPassword }}",
  "message": "两次输入的密码不一致"
}
```

**注意**：
- 表达式需要用 `{{ }}` 包裹
- 可以访问 `$values` 获取表单数据
- 表达式应返回布尔值

## 完整示例

### 注册表单示例

```json
{
  "labelWidth": 150,
  "labelAlign": "right",
  "items": [
    {
      "label": "用户名",
      "name": "username",
      "component": "Input",
      "required": true,
      "designKey": "design-user"
    },
    {
      "label": "密码",
      "name": "password",
      "component": "Password",
      "required": true,
      "rules": [
        {
          "type": "min",
          "value": 8,
          "message": "密码至少8位"
        },
        {
          "type": "max",
          "value": 20,
          "message": "密码最多20位"
        },
        {
          "type": "pattern",
          "value": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)",
          "message": "密码必须包含大小写字母和数字"
        }
      ],
      "designKey": "design-pass"
    },
    {
      "label": "确认密码",
      "name": "confirmPassword",
      "component": "Password",
      "required": true,
      "rules": [
        {
          "type": "jsExpr",
          "value": "{{ $values.password === $values.confirmPassword }}",
          "message": "两次输入的密码不一致"
        }
      ],
      "designKey": "design-conf"
    },
    {
      "label": "邮箱",
      "name": "email",
      "component": "Input",
      "rules": [
        {
          "type": "builtin",
          "value": "email",
          "message": "请输入有效的邮箱地址"
        }
      ],
      "designKey": "design-email"
    },
    {
      "label": "手机号",
      "name": "phone",
      "component": "Input",
      "rules": [
        {
          "type": "pattern",
          "value": "^1[3-9]\\d{9}$",
          "message": "请输入有效的手机号"
        }
      ],
      "designKey": "design-phone"
    }
  ]
}
```

## 可视化配置

在表单设计器中，每个表单项的"校验"标签页提供了完整的可视化配置界面：

1. **必填开关** - 快速设置字段为必填
2. **校验规则列表** - 可添加多个校验规则
   - 选择规则类型
   - 根据类型配置对应的值
   - 设置错误提示信息
   - 选择触发时机（失焦/输入）

## 兼容性说明

新版 `parseRules` 函数完全兼容旧格式的 `expr` 配置：

```json
// 旧格式（仍然支持）
{
  "expr": "/^1[3-9]\\d{9}$/",
  "message": "请输入有效的手机号"
}

// 新格式（推荐）
{
  "type": "pattern",
  "value": "^1[3-9]\\d{9}$",
  "message": "请输入有效的手机号"
}
```

## 触发时机

可以为每个规则单独设置触发时机：

- `blur` - 失去焦点时触发
- `change` - 输入时触发
- `['blur', 'change']` - 两种情况都触发（默认）

```json
{
  "type": "required",
  "message": "必填字段",
  "trigger": "blur"
}
```

## 实现原理

校验规则通过 `parseRules` 函数解析为 Element Plus / async-validator 兼容的规则数组：

```typescript
import { parseRules } from '@/utils'

const rules = parseRules([
  { type: 'required', message: '必填' },
  { type: 'min', value: 6, message: '至少6位' }
])

// 输出：
// [
//   { required: true, message: '必填', trigger: ['blur', 'change'] },
//   { min: 6, message: '至少6位', trigger: ['blur', 'change'] }
// ]
```

## 扩展其他组件

如需为其他组件添加校验配置，可以直接引入通用配置：

```typescript
import { validationRulesSchema } from '@/config/validationRulesSchema'

export default {
  // ... 其他配置
  children: [
    {
      label: '校验',
      name: 'validation',
      component: 'TabPane',
      children: validationRulesSchema
    }
  ]
}
```
