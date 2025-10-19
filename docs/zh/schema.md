# JsonSchema数据协议

低代码表单开发，最核心的就是JSON Schema，理解了这套协议之后，我们就能更高效，更快速的来开发表单了。

## 结构

首先，我们要理解，JSON Schema就是 **表单的抽象** 。

JSON的第一层是表单整体的全局配置，如标签样式，整体禁用等。 除此之外就是`items`了。

`items`里是每个表单项的抽象，`label`、`name`、`component`等是每个表单项的通用配置。

`component`代表该表单项使用什么组件 ，`props`是传给该组件的props。大部分组件都是基于**element-plus**二次封装，所以也支持该组件在el文档的所有props

## 例子

```json
{
  "labelWidth": 150, //全局label宽度
  "labelAlign": "right", //全局label对齐方式
  "size": "default", //全局表单项大小
  "submitBtn": true, //是否显示提交按钮
  //所有表单项的配置
  "items": [
    {
      "label": "用户名",
      "component": "Input", //表单项使用的组件
      "props": {
        //传给该组件的props，支持该组件在element-plus的所有props
        "placeholder": "请输入用户名"
      },
      "name": "username" //唯一标识，数据key
    },
    {
      "label": "密码",
      "component": "Password",
      "props": {
        "placeholder": "请输入密码"
      },
      "name": "password"
    }
  ]
}
```

## 配置

了解了上面的简单用例后，下面是所有可选配置：

### 表单全局配置

| 参数名               | 类型                              | 默认值      | 描述                 |
| -------------------- | --------------------------------- | ----------- | -------------------- |
| labelWidth           | `number`                          | `150`       | 表单label宽度        |
| labelAlign           | `'left' \| 'top' \| 'right' `     | `'right'`   | 表单label对齐方式    |
| labelSuffix          | `string`                          | -           | 表单label后缀        |
| labelBold            | `boolean`                         | `false`     | 表单label加粗        |
| size                 | `'small' \| 'default' \| 'large'` | `'default'` | 表单项大小           |
| hideRequiredAsterisk | `boolean`                         | `false`     | 隐藏必填星号         |
| disabled             | `boolean`                         | `false`     | 禁用整个表单         |
| items                | `FormItemType[]`                  | `[]`        | 表单所有表单项的配置 |
| submitBtn            | `boolean`                         | `true`      | 是否显示提交按钮     |
| resetBtn             | `boolean`                         | `true`      | 是否显示重置按钮     |

### 表单项配置（FormItemType）

| 参数名       | 类型             | 默认值  | 描述                                               |
| ------------ | ---------------- | ------- | -------------------------------------------------- |
| label        | `string`         | -       | 标签                                               |
| name         | `string`         | -       | 唯一标识，数据key                                  |
| component    | `string`         | -       | 组件标识。                                         |
| props        | `object`         | `{}`    | 传给组件的props，具体参考element-plus文档          |
| required     | `boolean`        | `false` | 是否必填                                           |
| initialValue | `any`            | -       | 初始值                                             |
| help         | `string`         | -       | 提示信息                                           |
| hidden       | `boolean`        | `false` | 是否隐藏                                           |
| hideLabel    | `boolean`        | `false` | 是否隐藏标签                                       |
| rules        | `FormRule[]`     | -       | 校验规则                                           |
| children     | `FormItemType[]` | -       | 子表单项数据，嵌套组件专用。如自增容器，卡片，栅格 |
| change       | `FormChange[]`   | -       | 数据变化时的联动配置                               |
