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

> Schema插值表达式 可以使用的联动变量：

| 变量名      | 类型   | 描述                            |
| ----------- | ------ | ------------------------------- |
| $values     | Object | 整个表单的值                    |
| $selectData | Object | 【选择类字段】选中项数据源合集  |
| $item       | Object | 【自增组件】专用，单行的数据值  |
| $index      | Object | 【自增组件】专用，单行的下标    |
| ...         | any    | 由schemaContext传入的自定义变量 |

这种联动方式能应对大部分联动场景，例如：控制字段禁用、隐藏、文案提示等交互。
:::

**JsonSchema 所有协议字段都支持模板表达式。**

::: demo expand

demo/linkageDemo/linkage.vue

:::




## change配置（值联动）

上面的模版表达式只可以实现配置间的联动，不能实现 **修改表单值** 类的联动，所以给每个字段提供了一个change配置。

配置了change，就会在这个字段的值改变时，才会触发change联动

change是一个数组，可以同时联动多个字段。target为目标字段，value是修改的值，也支持模版表达式。

::: demo expand

demo/linkageDemo/linkage3.vue

:::



## 更多示例

#### 评分低于3星可以输入差评原因

::: demo 

demo/linkageDemo/linkage1.vue

:::



#### 选完商品，显示价格

::: demo 

demo/linkageDemo/linkage4.vue

:::