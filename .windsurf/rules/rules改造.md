---
trigger: manual
---

目标：
设计并实现一个用于低代码表单引擎的「表单规则解析模块 parseRules()」。

要求说明：

所有表单项规则统一使用以下结构：

interface RuleItem {
type: 'required' | 'min' | 'max' | 'pattern' | 'builtin' | 'enum' | 'custom' | 'jsExpr'
value?: any
message?: string
trigger?: string | string[]
}

所有类型的解析逻辑如下：

type value 含义 解析逻辑
required 无 { required: true }
min number { min: value }
max number { max: value }
pattern string (正则) { pattern: new RegExp(value) }
builtin string (async-validator 内置类型) { type: value }
enum array { enum: value }
custom string (函数体字符串) { validator: new Function('rule','value','callback', value) }
jsExpr boolean (预解析表达式结果) { validator: async () => { if (!value) throw new Error(message) } }

解析输出为 Element Plus / async-validator 兼容的规则数组。

默认 trigger 为 ['blur', 'change']。

代码需简洁、类型安全，推荐使用 TypeScript。

可直接用于：

<el-form-item :rules="parseRules(schema)">

示例输入：

{
"rules": [
{ "type": "required", "message": "请输入密码" },
{ "type": "min", "value": 6, "message": "至少6位" },
{
"type": "jsExpr",
"value": false,
"message": "两次密码不一致"
}
]
}

示例输出：

[
{ required: true, message: '请输入密码', trigger: ['blur','change'] },
{ min: 6, message: '至少6位', trigger: ['blur','change'] },
{
validator: async () => { throw new Error('两次密码不一致') },
message: '两次密码不一致',
trigger: ['blur','change']
}
]

请据此直接实现 parseRules(schema: { rules?: RuleItem[] }) 函数。
