## Schema详解

低代码表单开发，最核心的就是JSON Schema，理解了这套协议之后，我们就能更高效，更快速的来开发表单了。

### 结构

首先，我们要理解，JSON Schema就是 **表单的抽象** 。

JSON的最外层是表单整体的配置，items里面是每个字段的配置。

items里是每个字段的抽象，label、name、component等是每个字段的通用配置。**props就是传给该组件的props，每种组件的props都不一样，可以用于定制组件的行为和样式。参考element-plus的文档**

```json
{
  "labelWidth": 150,   //表单label宽度
  "labelAlign": "right",   //表单label对齐方式
  "size": "default",   //表单字段大小
  "items": [  //表单所有字段的配置
    {
      "label": "用户名", //字段的label
      "component": "input", //字段使用的组件
      "props": {    //传给该组件的props，支持该组件在element plus的所有props
        "placeholder": "请输入用户名"
      },
      "name": "username" //字段标识，也就是值key
    },
    {
      "label": "密码",
      "component": "password",
      "props": {
        "placeholder": "请输入密码"
      },
      "name": "password"
    },
    {
      "component": "button",
      "props": {
        "name": "提交",
        "clickEvent": "submitForm"
      }
    }
  ]
}
```


### 配置

了解了上面的简单用例后，下面是所有可选配置：

#### 表单整体配置

| 参数名               | 类型                            | 默认值  | 是否必传 | 描述              |
| -------------------- | ------------------------------- | ------- | -------- | ----------------- |
| labelWidth           | Number                          | 150     | No       | 表单label宽度     |
| labelAlign           | 'left' \| 'top'   \| 'right'    | right   | No       | 表单label对齐方式 |
| size                 | 'small' \| 'default' \| 'large' | default | No       | 表单字段大小      |
| hideRequiredAsterisk | Boolean                         | false   | No       | 表单隐藏必填星号  |
| labelBold            | Boolean                         | false   | No       | 表单label加粗     |

#### 表单项配置

| 参数名       | 类型    | 默认值 | 是否必传 | 描述                                                                                                          |
| ------------ | ------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------- |
| label        | String  | ———    | No       | 标签                                                                                                          |
| name         | String  | ———    | Yes      | 唯一标识，值key                                                                                               |
| component    | String  | ———    | yes      | 使用的组件                                                                                                    |
| props        | Object  | {}     | No       | 传给组件的props,具体参考element文档                                                                           |
| required     | Boolean | false  | No       | 字段是否必填                                                                                                  |
| initialValue | any     | ———    | No       | 字段初始值                                                                                                    |
| style        | Object  | {}     | No       | 字段样式，不包括它使用的组件<br/>如果想修改组件的样式，可以给props里传递style，就会传递给element原生的style了 |
| help         | String  | ———    | No       | 字段的提示信息                                                                                                |
| hideLabel    | Boolean | false  | No       | 是否隐藏字段的标签                                                                                            |
| rules        | Array   | ——     | No       | 字段校验规则，Input组件专用                                                                                   |
| children     | Array   | ——     | No       | 子字段数据，嵌套字段专用，如自增容器，卡片，栅格                                                              |
