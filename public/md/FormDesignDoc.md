## 简介

FormDesign 是 vue-form-craft 的可视化表单设计器组件。


```vue
<template>
  <form-design v-model="schema" @onSave="onSave" />
</template>

<script setup>
import { ref } from 'vue'

const schema = ref({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: []
})

const onSave = () => {
  console.log(schema.value)
}
</script>

```

## Props

| 参数名               | 类型       | 默认值  | 是否必传 | 描述                                                        |
| -------------------- | ---------- | ------- | -------- | ----------------------------------------------------------- |
| v-model              | object ref | ref({}) | No       | 设计器的Schema，双向绑定                                    |
| previewSchemaContext | object     | {}      | No       | **表单预览** 的自定义联动变量                               |
| style                | any        | ———     | No       | 设计器的style                                               |
| class                | any        | ———     | No       | 设计器的class                                               |
| schemaId             | String     | ———     | No       | 设计器会根据这个id，远程获取schema。需提前配置getSchema方法 |

## Events

| 事件名 | 类型         | 描述               |
| ------ | ------------ | ------------------ |
| onSave | schema=>void | 点击保存按钮时触发 |

