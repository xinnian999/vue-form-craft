## 低代码开发方案

将 `vue-form-craft` 接入vue3项目后，推荐两种高效率的低代码开发方案。

### 方案一

这种属于轻量级使用方案，适用于项目规模较小，且对表单的动态性要求不高。

就是前端使用 `FormDesign` 做一个 **表单设计器** 的页面，对内开放，专门用来设计表单。

遇到表单的需求，前端开发的同学就来到这个页面拖拉拽搞出一个表单，然后导出json写到代码中，最后再用 `SchemaForm` 组件渲染出来就可以了。


### 方案二

这是作者比较推荐的一个方案。表单管理模式，需要后端同学配合，数据库建一张表用于存储前端的所有表单。

前端开发一套 **表单管理 + 表单设计** 页面。表单管理页面具有增删改查的功能，新增或修改表单就跳转到表单设计页面，直接在线设计修改即可.

适用于项目规模较大，需要频繁修改表单或希望在不重新发布前端代码的情况下进行表单调整

> `vue-form-craft` 提供了 `RemoteFormDesign` 和 `RemoteSchemaForm` 组件，它俩分别是设计器和渲染器的扩展组件，使用这两个组件，不再支持传入静态schema参数，而是支持schemaId参数，组件内部会自动根据schemaId查询远程表单（需要全局配置getSchema方法）。


```vue
<template>
  <remote-form-design :schemaId="route.query.formId" @onSave="onSave" />
</template>

<script setup>
import { useRoute } from "vue-router";
import { request } from "@/utils";
import { ElMessage } from "element-plus";

const route = useRoute();

const onSave = async (schema) => {
  if (!route.query.formId) {
    return ElMessage.error(`未指定表单id`);
  }

  await request({
    url: "/current/update/form",
    method: "put",
    data: {
      id: route.query.formId,
      formSchema: JSON.stringify(schema),
    },
  });

  ElMessage.success(`保存成功`);
};
</script>

```