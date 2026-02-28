# JsonSchema 数据协议

低代码表单开发中，JSON Schema 是最核心的协议。它把“一个表单”拆成可序列化、可存储、可动态计算的结构描述。

## 结构

先建立一个总认知：**JSON Schema = 表单结构 + 字段行为 + 运行时联动规则**。

`FormSchema` 的结构可以分成 4 层：

1. `FormSchema`：表单级配置（全局样式、按钮、初始值等）
2. `items: FormItemType[]`：字段树（每个节点就是一个表单项）
3. `FormItemType.items`：子节点（用于布局组件/容器组件的嵌套）
4. `rules / linkages / when / show`：字段行为与联动规则

```ts
type FormSchema = {
  // A. 表单全局配置
  labelWidth?: number
  labelAlign?: 'top' | 'left' | 'right'
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  initialValues?: Record<string, any>
  submitBtn?: boolean
  resetBtn?: boolean
  // ...

  // B. 字段树
  items?: FormItemType[]
}

interface FormItemType {
  // C. 字段语义
  label?: string
  name: string
  required?: boolean
  help?: string

  // D. 渲染配置
  component: string
  componentProps?: Record<string, any>

  // E. 行为配置
  when?: boolean | string
  show?: boolean | string
  rules?: FormRules
  linkages?: FormLinkage[]

  // F. 嵌套
  items?: FormItemType[]
}
```

### 结构关系图

```text
FormSchema
├─ 全局配置（labelWidth/size/disabled/...）
├─ initialValues（业务初始值）
└─ items[]
   ├─ FormItemType（普通字段）
   │  ├─ component + componentProps
   │  ├─ rules / linkages
   │  └─ name（支持 deep path，如 user.profile.name）
   └─ FormItemType（容器字段）
      └─ items[]（继续递归）
```

### 两个容易混淆的点

1. `initialValues`（表单级）用于**业务初始值**，会进入表单数据。
2. `defaultValue`（字段级）用于**组件展示默认值**，不一定写回 `formValues`。

## 示例

```json
{
  "labelWidth": 150,
  "labelAlign": "right",
  "size": "default",
  "scrollToError": true,
  "submitBtn": true,
  "resetBtn": true,
  "initialValues": {
    "account.remember": true
  },
  "items": [
    {
      "label": "用户名",
      "name": "account.username",
      "component": "Input",
      "required": true,
      "componentProps": {
        "placeholder": "请输入用户名"
      }
    },
    {
      "label": "密码",
      "name": "account.password",
      "component": "Password",
      "required": true,
      "componentProps": {
        "placeholder": "请输入密码"
      }
    },
    {
      "label": "确认密码",
      "name": "account.rePassword",
      "component": "Password",
      "show": "{{ $values.account?.password }}",
      "rules": [
        {
          "type": "custom",
          "message": "两次密码不一致"
        }
      ]
    }
  ]
}
```

## 配置

下面是协议中的常用字段说明（以当前类型定义为准）。

### 表单全局配置（FormSchema）

| 参数名               | 类型                              | 默认值      | 描述 |
| -------------------- | --------------------------------- | ----------- | ---- |
| labelWidth           | `number`                          | `150`       | 全局标签宽度 |
| labelAlign           | `'left' \| 'top' \| 'right'`      | `'right'`   | 全局标签对齐 |
| colon                | `boolean`                         | `false`     | 标签后是否显示冒号 |
| size                 | `'small' \| 'default' \| 'large'` | `'default'` | 全局组件尺寸 |
| disabled             | `boolean`                         | `false`     | 是否禁用整个表单 |
| hideRequiredAsterisk | `boolean`                         | `false`     | 是否隐藏必填星号 |
| scrollToError        | `boolean`                         | `false`     | 提交校验失败时是否滚动到错误项 |
| initialValues        | `Record<string, any>`             | -           | 表单初始值（业务数据） |
| items                | `FormItemType[]`                  | `[]`        | 表单字段树 |
| style                | `any`                             | -           | 表单容器行内样式 |
| styleBlock           | `string`                          | -           | 以 CSS 文本形式注入样式 |
| formId               | `string`                          | -           | 表单 id（用于样式隔离等场景） |
| submitBtn            | `boolean`                         | `true`      | 是否显示提交按钮 |
| resetBtn             | `boolean`                         | `true`      | 是否显示重置按钮 |

### 表单项配置（FormItemType）

| 参数名         | 类型                         | 默认值  | 描述 |
| -------------- | ---------------------------- | ------- | ---- |
| label          | `string`                     | -       | 字段标签 |
| labelWidth     | `number`                     | -       | 当前字段标签宽度（覆盖全局） |
| labelAlign     | `'top' \| 'left' \| 'right'` | -       | 当前字段标签对齐（覆盖全局） |
| size           | `'default' \| 'small' \| 'large'` | - | 当前字段尺寸（覆盖全局） |
| name           | `string`                     | -       | 字段唯一标识，支持路径写法，如 `info.basic.name` |
| component      | `string`                     | -       | 渲染组件标识 |
| componentProps | `Record<string, any>`        | `{}`    | 透传给组件的 props |
| required       | `boolean`                    | `false` | 是否必填 |
| defaultValue   | `any`                        | -       | 组件展示层默认值 |
| help           | `string`                     | -       | 帮助提示 |
| alert          | `string`                     | -       | 警示文案 |
| when           | `boolean \| string`          | `true`  | 是否渲染（`false` 时不挂载） |
| show           | `boolean \| string`          | `true`  | 是否显示（隐藏但仍保留挂载） |
| rules          | `FormRules`                  | -       | 校验规则数组 |
| items          | `FormItemType[]`             | -       | 子节点（容器/布局组件使用） |
| class          | `any`                        | -       | 字段 class |
| style          | `any`                        | -       | 字段 style |
| linkages       | `FormLinkage[]`              | -       | 字段值变化时的联动配置 |
| designKey      | `string`                     | -       | 设计器内部字段 key |

### 联动配置（FormLinkage）

| 参数名     | 类型                 | 默认值 | 描述 |
| ---------- | -------------------- | ------ | ---- |
| target     | `string`             | -      | 目标字段 `name` |
| type       | `'attr' \| 'data'`   | -      | 联动类型：属性联动/数据联动 |
| condition  | `any`                | -      | 触发条件（可配表达式） |
| value      | `any`                | -      | 要写入的值 |
| path       | `string`             | -      | 目标写入路径（属性联动常用） |
| customPath | `string`             | -      | 自定义路径 |

### 校验规则（RuleItem）

| 参数名  | 类型 | 默认值 | 描述 |
| ------ | ---- | ------ | ---- |
| type   | `'required' \| 'min' \| 'max' \| 'pattern' \| 'builtin' \| 'enum' \| 'custom' \| 'jsExpr'` | - | 规则类型 |
| value  | `any` | - | 规则参数值 |
| message| `string` | - | 校验失败提示 |
| trigger| `'blur' \| 'change'` | - | 触发时机 |
