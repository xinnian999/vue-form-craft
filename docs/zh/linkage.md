<script setup>
import Linkage from './linkageDemo/linkage.vue'
import Linkage1 from './linkageDemo/linkage1.vue'
import Linkage2 from './linkageDemo/linkage2.vue'
import Linkage3 from './linkageDemo/linkage3.vue'
import Linkage4 from './linkageDemo/linkage4.vue'
</script>

# 表单联动

要评价一个表单工具能力强不强，表单联动能力至关重要。

`vue-form-craft` 提供了一套【**极其简单且灵活**】的表单联动实现方式！

分为【配置级联动】和【值联动】两种实现方式

## 模板表达式（配置级联动）

::: v-pre
模板表达式为字符串格式，以双花括号 {{ ... }} 为语法特征，对于字段间联动提供一种简洁的配置方式。

在JsonSchema中，被双花括号包裹的字符串一律会被解析为 **js表达式并返回结果**，且可以使用一些联动变量。

> Schema 可以使用的联动变量：

| 变量名      | 类型   | 描述                            |
| ----------- | ------ | ------------------------------- |
| $values     | Object | 整个表单的值                    |
| $selectData | Object | 【选择类字段】选中项数据源合集  |
| $item       | Object | 【自增组件】专用，单行的数据值  |
| $index      | Object | 【自增组件】专用，单行的下标    |
| ...         | any    | 由schemaContext传入的自定义变量 |

**这些变量一旦发生更新时，Schema就会基于这些变量重新计算。**

这种联动方式能应对大部分联动场景，例如：控制字段禁用、隐藏、文案提示等交互。
:::


::: demo expand

demo/linkageDemo/linkage.vue

:::

**JsonSchema 所有协议字段都支持模板表达式。** 这意味着你可以动态的控制表单的任何细粒度的配置，实现各种复杂的联动效果！




## change配置（值联动）

上面的模版表达式只可以实现配置间的联动，不能实现 **修改表单值** 类的联动，所以给每个字段提供了一个change配置。

配置了change，就会在这个字段的值改变时，才会触发change联动

change是一个数组，可以同时联动多个字段。

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