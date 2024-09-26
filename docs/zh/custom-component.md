# 自定义组件

`vue-form-craft` 提供了一些基础组件，例如 input、select 和 radio 等。

但有时候这些组件并不能完全满足我们的业务需求，此时可以考虑使用**自定义组件**。

## 使用方式

自定义组件的键为 `Custom` 组件，然后我们再为它传递一个关键的props ：`componentName`。

componentName是一个你项目里的全局组件的名称，`vue-form-craft`会自动为这个组件传递`v-model`，来与表单建立数据连接。


> 也可以通过设计器快速生成

<img src="../assets/custom-component.png" style="height:300px" />



## 示例

结合`el-input` 和 `el-button`，我们封装一个常见的验证码输入框，并通过自定义组件调用！

::: demo expand

demo/CustomComponent.vue

:::


```vue
<template>
  <div class="vfc-code">
    <el-input v-model="value" placeholder="请输入验证码" />
    <el-button>发送验证码</el-button>
  </div>
</template>

<script setup lang="ts">
const value = defineModel<string>()
</script>

<style>
.vfc-code {
  display: flex;
}
</style>
```