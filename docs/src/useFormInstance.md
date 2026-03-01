# useFormInstance

一个在你扩展**自定义组件**时才可能用到的hooks，用于获取当前上下文正在使用的 Form 实例。

## 使用案例

这里演示二次封装一个el的穿梭框组件：

- 通过`formInstance.getRead()`判断表单处于阅读模式时的展示效果

- 在选中项变化时，调用`formInstance.updateSelectData`保存选中项数据，用于其他组件联动

```vue
<template>
  <div v-if="formInstance.getRead()">
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

完整示例：[例：扩展穿梭框](/extendTransfer)

## Form实例属性

> 说明：实例以方法形式暴露能力，按需调用即可。

| 属性名           | 类型                                                | 描述 |
| ---------------- | --------------------------------------------------- | ---- |
| getSchema        | `() => FormSchema`                                  | 获取当前 Schema |
| getSchemaContext | `() => Record<string, any> \| undefined`            | 获取 Schema 上下文 |
| getDesign        | `() => boolean \| undefined`                        | 获取是否设计模式 |
| getRead          | `() => boolean \| undefined`                        | 获取是否阅读模式 |
| getSelectData    | `() => Record<string, Record<string, any>>`         | 获取选择类组件选中项数据 |
| getContext       | `() => Record<string, any>`                         | 获取联动运行上下文 |
| getValues        | `() => Record<string, any>`                         | 获取当前表单值 |
| setValues        | `(values: Record<string, any>) => void`             | 批量设置表单值 |
| getFieldValue    | `(path: string) => any`                             | 获取单字段值 |
| setFieldValue    | `(path: string, value: any) => void`                | 设置单字段值 |
| updateSelectData | `(key: string, value: Record<string, any>) => void` | 更新选择类组件选中项数据 |
| setFieldAttr     | `(name: string, path: string, value: any) => void`  | 动态设置字段属性 |
| validate         | `() => FormValidationResult \| undefined`           | 执行校验 |
| resetFields      | `(names?: string[]) => void`                        | 重置字段（不传则重置全部） |
| submit           | `() => void`                                        | 触发提交流程 |
