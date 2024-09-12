# JsonSchema详解

低代码表单开发，最核心的就是JSON Schema，理解了这套协议之后，我们就能更高效，更快速的来开发表单了。

## 结构

首先，我们要理解，JSON Schema就是 **表单的抽象** 。

JSON的最外层是表单整体的配置，items里面是每个表单项的配置。

items里是每个表单项的抽象，label、name、component等是每个表单项的通用配置。

component代表该表单项使用什么组件，props是传给该组件的props。大部分组件都是基于**element-plus**二次封装，所以也支持该组件在el文档的所有props

```json
{
  "labelWidth": 150, //表单label宽度
  "labelAlign": "right", //表单label对齐方式
  "size": "default", //表单表单项大小
  "items": [
    //表单所有表单项的配置
    {
      "label": "用户名", //表单项的label
      "component": "input", //表单项使用的组件
      "props": {
        //传给该组件的props，支持该组件在element plus的所有props
        "placeholder": "请输入用户名"
      },
      "name": "username" //唯一标识，也就是值key
    },
    {
      "label": "密码",
      "component": "password",
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

### 表单整体配置

| 参数名               | 类型                              | 默认值      | 描述              |
| -------------------- | --------------------------------- | ----------- | ----------------- |
| labelWidth           | `number`                          | `150`       | 表单label宽度     |
| labelAlign           | `'left' \| 'top' \| 'right' `     | `'right'`   | 表单label对齐方式 |
| size                 | `'small' \| 'default' \| 'large'` | `'default'` | 表单表单项大小      |
| hideRequiredAsterisk | `boolean`                         | `false`     | 表单隐藏必填星号  |
| labelBold            | `boolean`                         | `false`     | 表单label加粗     |
| disabled             | `boolean`                         | `false`     | 禁用所有表单项    |

### 表单项配置

| 参数名       | 类型             | 默认值 | 描述                                             |
| ------------ | ---------------- | ------ | ------------------------------------------------ |
| label        | `string`         | -      | 标签                                             |
| name         | `string`         | -      | 唯一标识，值key                                  |
| component    | `string`         | -      | 使用的组件                                       |
| props        | object           | {}     | 传给组件的props，具体参考element-plus文档        |
| required     | `boolean`        | false  | 表单项是否必填                                     |
| initialValue | any              | -      | 表单项初始值                                       |
| help         | `string`         | -      | 表单项的提示信息                                   |
| hidden       | `boolean`        | false  | 是否隐藏表单项                                   |
| hideLabel    | `boolean`        | false  | 是否隐藏表单项的标签                               |
| rules        | `FormRule[]`     | -      | 表单项校验规则，Input组件专用                      |
| children     | `FormItemType[]` | -      | 子表单项数据，嵌套表单项专用，如自增容器，卡片，栅格 |
| change       | `FormChange[]`   | -      | 表单项值变化时，触发的联动配置                     |
| designKey    | `string`         | -      | 给表单设计器用的标识key，自动生成                |

