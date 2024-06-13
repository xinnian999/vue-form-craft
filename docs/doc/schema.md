# Schema详解

低代码表单开发，最核心的就是JSON Schema，理解了这套协议之后，我们就能更高效，更快速的来开发表单了。

## 结构

首先，我们要理解，JSON Schema就是 **表单的抽象** 。

JSON的最外层是表单整体的配置，items里面是每个字段的配置。

items里是每个字段的抽象，label、name、component等是每个字段的通用配置。

component代表使用什么组件，props是传给该组件的props。大部分组件都是基于el二次封装，所以也支持该组件在el文档的所有props

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

| 参数名               | 类型                            | 默认值  | 是否必传 | 描述              |
| -------------------- | ------------------------------- | ------- | -------- | ----------------- |
| labelWidth           | Number                          | 150     | No       | 表单label宽度     |
| labelAlign           | 'left' \| 'top'   \| 'right'    | right   | No       | 表单label对齐方式 |
| size                 | 'small' \| 'default' \| 'large' | default | No       | 表单字段大小      |
| hideRequiredAsterisk | Boolean                         | false   | No       | 表单隐藏必填星号  |
| labelBold            | Boolean                         | false   | No       | 表单label加粗     |
| disabled             | Boolean                         | false   | No       | 禁用所有表单项    |

### 字段配置

| 参数名       | 类型    | 默认值 | 是否必传 | 描述                                                                            |
| ------------ | ------- | ------ | -------- | ------------------------------------------------------------------------------- |
| label        | String  | ———    | No       | 标签                                                                            |
| name         | String  | ———    | Yes      | 唯一标识，值key                                                                 |
| component    | String  | ———    | yes      | 使用的组件                                                                      |
| props        | Object  | {}     | No       | 传给组件的props,具体参考element文档                                             |
| required     | Boolean | false  | No       | 字段是否必填                                                                    |
| initialValue | any     | ———    | No       | 字段初始值                                                                      |
| help         | String  | ———    | No       | 字段的提示信息                                                                  |
| hidden       | Boolean | false  | No       | 是否隐藏字段息                                                                  |
| hideLabel    | Boolean | false  | No       | 是否隐藏字段的标签                                                              |
| rules        | Array   | ——     | No       | 字段校验规则，Input组件专用                                                     |
| children     | Array   | ——     | No       | 子字段数据，嵌套字段专用，如自增容器，卡片，栅格                                |
| change       | Array   | ——     | No       | 字段值变化时，触发的联动配置                                                    |
| designKey    | String  | ——     | No       | 给表单设计器用的标识key，自动生成                                               |
| style        | any     | ——     | No       | FormItem的样式，不是组件的样式<br/>如果想修改组件的样式，可以给props里传递style |
| class        | any     | ——     | No       | FormItem的类名，不是组件的类名<br/>如果想修改组件的类名，可以给props里传递class |

## 深层数据绑定

在开发过程中，经常会遇到需要将前端数据转换为符合服务端数据结构的情况。

比如一张表单你收集到的可能是这样的数据：


```js
{
  hostname: "host1111",
  desc: "2222",
  cpu: 2，
  memory: 4
}
```

而后端希望收到的是这样的数据

```js
{
  hostname: "host1111",
  desc: "2222",
  flavor:{
    cpu: 2，
    memory: 4
  }
}
```

为了解决这个问题，**name** 字段扩展为魔法字段，既是唯一标识，也是数据路径，可以让你自由指定数据存储的层级。

比如name是【hostname】，数据就会保存为` { hostname: 'xxx' }`

比如name是【flavor.cpu】，数据就会保存为` { flavor: { cpu:'xxx' } }`

比如name是【flavor.memory】，数据就会保存为` { flavor: { memory:'xxx' } }`

无论数据层级保存的多深，都能准确追踪，且能精准校验