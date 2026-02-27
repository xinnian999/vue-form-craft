# 表单联动

要评价一个表单工具能力强不强，表单联动能力至关重要。

《vue-form-craft》提供了一套【**简单且灵活**】的表单联动实现方式！

分为【JS表达式】和【数据联动】两种实现方式

## JS表达式

::: v-pre

<red> 当JsonSchema某个协议字段需要联动时，使用《JS表达式》就够了。</red>

**JS表达式**为字符串格式，以双花括号 `"{{ ... }}"` 为语法特征。

在JsonSchema中，被双花括号包裹的字符串一律会被**动态解析**为 **js表达式并返回结果**，且可以使用一些联动变量（上下文）。

> JS表达式 可以使用的联动变量：

| 变量名      | 类型   | 描述                              |
| ----------- | ------ | --------------------------------- |
| $values     | Object | 整个表单的值                      |
| $selectData | Object | 【选择类字段】选中项数据集        |
| $item       | Object | 【自增组件】专用，单行的数据集    |
| $index      | Object | 【自增组件】专用，单行的下标      |
| ...         | any    | 由`schemaContext`传入的自定义变量 |

**这些变量一旦发生更新时，JsonSchema就会基于这些变量重新计算。**

这种联动方式能应对大部分联动场景，例如：控制字段禁用、隐藏、文案提示等交互。
:::

::: demo expand

demo/linkageDemo/linkage.vue

:::

**JsonSchema 所有协议字段都支持JS表达式。** 这意味着你可以动态的控制表单的任何细粒度的配置，实现各种复杂的联动效果！

## 数据联动

当需要监听某个表单项数据变化时，触发联动，可以配置`change`来实现。

`change`是一个数组，可以同时联动多个字段。

**target为目标字段（必传），condition是触发条件（不传默认会一直触发）， value是修改的值（不传默认会将字段值清掉）。**

::: demo expand

demo/linkageDemo/linkage3.vue

:::

## 更多示例

1、评分低于3星可以输入差评原因

::: demo

demo/linkageDemo/linkage1.vue

:::

<br/>

2、选完商品，将其价格传给下一个字段

::: demo

demo/linkageDemo/linkage4.vue

:::

<br/>

3、串行联动：`性别`为女时，需要填写是否怀孕，已怀孕可以继续填写怀孕周期。（切换为男性时，清除填写过的怀孕信息）

::: demo

demo/linkageDemo/linkage5.vue

:::

<br/>

4、自增组件联动：`批量设置密码`会联动所有密码框。`用户名` 清空时，会自动清空对应的密码。

::: demo

demo/linkageDemo/linkageFormlist.vue

:::
