# useFormInstance

一个在你扩展**自定义组件**时才可能用到的hooks，用于获取当前上下文正在使用的 Form 实例。

## 使用案例

这里演示二次封装一个el的穿梭框组件：

+ 通过`formInstance.read`判断表单处于阅读模式时的展示效果

+ 在选中项的同时，调用`formInstance.updateSelectData`保存选中项的数据源，用于其他组件联动时使用

```vue
<template>
  <div v-if="formInstance.read">
    {{ value?.map((val) => data.find((v) => v.key === val)?.label).join('、') }}
  </div>
  <el-transfer v-else v-bind="$attrs" :data="data" @change="onChange" v-model="value" />
</template>

<script setup lang="ts">
import type { TransferDataItem, TransferKey } from 'element-plus'
import { useFormInstance } from 'vue-form-craft'

const props = defineProps<{ name: string; data: TransferDataItem[] }>()

const formInstance = useFormInstance() // 获取到表单实例

const value = defineModel<TransferKey[]>()

const onChange = (value: TransferKey[]) => {
  const source = value.map((val) => props.data.find((v) => v.key === val))
  formInstance.updateSelectData(props.name, source) // 向SelectData保存选中项的数据源
}
</script>

```

完整示例：[例：扩展穿梭框](/zh/extendTransfer)

## Form实例属性

>注意：所有实例属性都是只读的，不可直接修改。 不可通过解构赋值访问，否则部分属性会失去响应式

| 属性名              | 类型                                                | 描述                                                                              |
| ------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------- |
| schema              | `FormSchema`                                        | 表单Schema配置，纯JSON，用于描述表单结构                                          |
| schemaContext       | `object`                                            | Schema自定义的 [联动变量](/zh/linkage)                                            |
| footer              | `boolean`                                           | 启用表单内置的提交和重置按钮                                                      |
| read                | `boolean`                                           | 是否处于阅读模式                                                                  |
| formValues          | `object`                                            | 表单值                                                                            |
| selectData          | `object`                                            | 选择类组件的数据源                                                                |
| initialValues       | `object`                                            | 表单初始值                                                                        |
| context             | `object`                                            | 表单联动变量                                                                      |
| updateFormValues    | `(values: Record<string, any>) => void`             | 更新**表单值**的方法                                                              |
| updateSelectData    | `(key: string, value: Record<string, any>) => void` | 更新**选择类组件的数据源**的方法                                                  |
| updateInitialValues | ` (values: Record<string, any>) => void`            | 更新**表单初始值**的方法                                                          |
| validate            | ` () => Promise<boolean>`                           | 校验表单                                                                          |
| resetFields         | `name[] => void`                                    | 接收一个name数组，例如`['name','age']` 来重置一组字段为初始值，不传会重置所有字段 |
| submit              | `() => void`                                        | 校验表单，校验通过后会触发`onFinish`事件                                          |


